import { groupsFor, paintOf } from './data.js';

export function optionById(car, groupId, optionId) {
  if (groupId === 'paint') {
    const color = car.colors.find((item) => item.id === optionId);
    if (!color) return null;
    return {
      id: color.id,
      name: color.name,
      price: color.price || 0,
      tip: color.joke
        ? 'Gold flake. Seventy-five hundred so the car can glitter. Your nonna would take the spatula away from you.'
        : '',
    };
  }
  const group = groupsFor(car.id).find((item) => item.id === groupId);
  return group?.options.find((item) => item.id === optionId) || null;
}

export function addToCart(build, groupId, optionId) {
  const list = Array.isArray(build.multi[groupId]) ? build.multi[groupId].slice() : [];
  if (list.includes(optionId)) return false;
  list.push(optionId);
  build.multi[groupId] = list;
  return true;
}

export function chooseOne(build, groupId, optionId) {
  if (build.single[groupId] === optionId) return false;
  build.single[groupId] = optionId;
  return true;
}

/** Drop one cart line. Multi options leave the rest. A single choice falls back to the included one. */
export function removeFromCart(car, build, groupId, optionId) {
  if (groupId === 'paint') {
    const current = paintOf(car, build);
    const fallback = car.colors.find((color) => !color.price) || car.colors[0];
    if (build.paint === fallback.id) return null;
    build.paint = fallback.id;
    return { name: current.name, price: current.price || 0, tip: '' };
  }
  const group = groupsFor(car.id).find((item) => item.id === groupId);
  if (!group) return null;
  const option = group.options.find((item) => item.id === optionId);
  if (!option) return null;
  if (group.mode === 'multi') {
    const list = build.multi[groupId] || [];
    if (!list.includes(optionId)) return null;
    build.multi[groupId] = list.filter((id) => id !== optionId);
    return option;
  }
  const fallback = group.options[0]?.id;
  if (!fallback || build.single[groupId] === fallback) return null;
  build.single[groupId] = fallback;
  return option;
}
