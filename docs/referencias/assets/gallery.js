(() => {
 const dialog=document.querySelector('.photo-viewer');
 if(!dialog || typeof dialog.showModal!=='function')return;
 const links=[...document.querySelectorAll('.collection-open')];
 const image=dialog.querySelector('.viewer-image');
 const count=dialog.querySelector('.viewer-count');
 const announcement=dialog.querySelector('.viewer-announcement');
 let current=0,opener=null;
 function show(index){current=(index+links.length)%links.length;const source=links[current].querySelector('img');image.src=links[current].href;image.alt=source.alt;count.textContent=`${current+1} / ${links.length}`;announcement.textContent=document.documentElement.lang==='es'?`Imagen ${current+1} de ${links.length}: ${source.alt}`:`Image ${current+1} of ${links.length}: ${source.alt}`;}
 links.forEach((link,index)=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();opener=link;dialog.showModal();show(index);}));
 dialog.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('.viewer-prev').addEventListener('click',()=>show(current-1));
 dialog.querySelector('.viewer-next').addEventListener('click',()=>show(current+1));
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(current+1)}if(event.key==='ArrowLeft'){event.preventDefault();show(current-1)}});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{opener?.focus()});
})();
