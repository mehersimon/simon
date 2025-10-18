async function searchSarees(ev) {
  ev?.preventDefault?.();
  const q = document.querySelector('#q').value.trim();
  const color = document.querySelector('#color').value;
  const design = document.querySelector('#design').value;
  const res = await fetch(`/api/sarees?q=${encodeURIComponent(q)}&color=${encodeURIComponent(color)}&design=${encodeURIComponent(design)}`);
  const data = await res.json();
  const list = document.querySelector('#results');
  list.innerHTML = '';
  if (data.items && data.items.length) {
    data.items.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-glow transition p-4';
      card.innerHTML = `
        <img class="w-full h-48 object-cover rounded-lg" src="${it.imageUrl || 'https://placehold.co/600x400?text=Saree'}" alt="${it.name}">
        <h3 class="mt-3 text-lg font-semibold text-primary-700 dark:text-primary-200">${it.name}</h3>
        <p class="text-sm text-zinc-600 dark:text-zinc-300">${it.color || ''} • ${it.design || ''} • ${it.material || ''}</p>
        <p class="mt-1 font-medium">₹ ${it.price || 0}</p>
      `;
      list.appendChild(card);
    });
  } else {
    list.innerHTML = '<p class="text-zinc-600 dark:text-zinc-300">No sarees found. Try different filters.</p>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#searchForm');
  if (form) {
    form.addEventListener('submit', searchSarees);
  }
});
