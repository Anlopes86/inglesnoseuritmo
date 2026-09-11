const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function harness(options={}){
 const elements=new Map(),timers=new Map();let timerId=0,authListener,loaded,reads=0,signOuts=0;
 const element=id=>{if(!elements.has(id))elements.set(id,{value:id==='username'?'example':id==='password'?'test-only':'',disabled:false,innerHTML:'',textContent:'',classList:{add(){},remove(){}},listeners:{},addEventListener(name,fn){this.listeners[name]=fn;}});return elements.get(id);};
 const user={uid:'own-profile'},location={href:'login.html'},stored=new Map();
 const db={collection(name){assert.equal(name,'students');return{doc(id){assert.equal(id,user.uid,'Only own profile is read');return{get(){reads++;if(options.get)return options.get();return Promise.resolve({exists:!options.missing,data:()=>({role:options.role||'professor',name:'Example'})});}};},where(){throw Error('Signing in must not list accounts');}};}};
 const auth={currentUser:user,onAuthStateChanged(fn){authListener=fn;},signOut(){signOuts++;return Promise.resolve();},signInWithEmailAndPassword(){if(options.authError)return Promise.reject({code:options.authError});if(options.emitAuth)authListener(user);return Promise.resolve({user});}};
 const context={window:{location},document:{getElementById:element,addEventListener(name,fn){if(name==='DOMContentLoaded')loaded=fn;}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)},firebase:{auth:()=>auth,firestore:()=>db},console:{error(){},warn(){},log(){}},setTimeout(fn,ms){timers.set(++timerId,{fn,ms});return timerId;},clearTimeout:id=>timers.delete(id)};
 vm.createContext(context);
 for(const p of ['js/platform-access.js','js/login.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),context,{filename:p});
 context.window.PlatformAccess.ensureInitialAdmin=()=>{throw Error('No administrative migration during login');};loaded();
 return{element,location,options,reads:()=>reads,signOuts:()=>signOuts,submit:()=>element('login-form').listeners.submit({preventDefault(){}}),expire(ms){const timer=[...timers.values()].find(t=>t.ms===ms);assert(timer,'Expected pending deadline');timer.fn();}};
}
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
(async()=>{
 for(const[role,target]of [['professor','index.html'],['admin','admin.html'],['aluno','home-aluno.html']]){
  const h=harness({role,emitAuth:true});await h.submit();assert.equal(h.location.href,target);assert.equal(h.reads(),1,'Observer and submit share the in-flight profile request');
 }
 const retry=harness({get:()=>Promise.reject({code:'permission-denied'})});await retry.submit();assert.equal(retry.element('login-btn').disabled,false);assert.match(retry.element('login-error').textContent,/permissões/);assert.equal(retry.location.href,'login.html');
 retry.options.get=()=>Promise.resolve({exists:true,data:()=>({role:'professor'})});await retry.submit();assert.equal(retry.location.href,'index.html','Same signed-in user can retry without a new auth event');
 const slow=harness({get:()=>new Promise(()=>{})});const pending=slow.submit();await flush();slow.expire(15000);await pending;assert.equal(slow.element('login-btn').disabled,false);assert.match(slow.element('login-error').textContent,/conexão/);
 const missing=harness({missing:true});await missing.submit();assert.equal(missing.location.href,'login.html');assert.equal(missing.signOuts(),1);assert.match(missing.element('login-error').textContent,/configurado/);
 const network=harness({authError:'auth/network-request-failed'});await network.submit();assert.match(network.element('login-error').textContent,/conexão/);assert.equal(network.reads(),0);
 const invalid=harness({authError:'auth/wrong-password'});await invalid.submit();assert.match(invalid.element('login-error').textContent,/senha inválidos/);
 console.log('PASS: existing roles, own-profile-only reads, no admin promotion, concurrent auth events, same-user retry, missing profile, permission denial, timeout and network/password feedback.');
})().catch(error=>{console.error(error);process.exitCode=1;});
