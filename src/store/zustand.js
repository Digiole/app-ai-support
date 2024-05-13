import { create } from 'zustand';
import ItemSelector from './ItemSelector.js';


export const useVectorStore = create((set, get) => ({

  cosineSimilarity: (a, b) => {
    return ItemSelector.cosineSimilarity(
      a,
      b
    );
  },

  featureExtraction: async (txt) => {
    //const url = 'http://localhost:3330/api/v1/extract-feature';
    const url = `${process.env.MIDDLEWARE_API_URL}extract-feature`;

    const cleanedText = txt.map(s => s.replace(/ {2,}/g, '').replace(/\n/g, " "));
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        /*   Authorization: `Bearer ${""}`, */
      },
      /*  mode: 'no-cors', */
      method: "POST",
      body: JSON.stringify({ text: cleanedText }),
    });
    //console.log("VECTOR ", result);

    if (!result.ok) {
      console.log("Middleware api error ");
      console.log(await result.text())
      //throw new Error(`HTTP error! status: ${response.status}`);
    }

    let vector = [];
    if (result.ok) {
      const vectorData = await result.json();
      vector = vectorData.vector;
    }
    return vector;

  },
  itemCount: 0,
  items: [],
  /* add: () => set((state) => ({ cart: state.cart + 1 })),
  remove: () => set((state) => ({ cart: state.cart - 1 })),
  removeAll: () => set({ cart: 0 }), */
  getItems: () => get().items,
  getLastItem: () => {
    const items = get().items;

    let lastItem;

    if (items.length > 0) {
      lastItem = items[items.length - 1].metadata;
    } else {
      lastItem = null; // or some default value
    }
    return lastItem;
  },
  add: (newItems, itemsTotal) => {

    set((state) => ({
      items: state.items.concat(newItems),
      itemCount: itemsTotal + newItems.length
    }))
  },

  insert: async (item) => {
    //   const textEmbedder = get().textEmbedder;
    const itemsTotal = get().itemCount;
    let inputVectors = [];
    let newItems = [];
    if (Array.isArray(item)) {
      inputVectors = await get().featureExtraction(item.map(i => i.text));
      newItems = item;
    } else {
      inputVectors = await get().featureExtraction([item.text]);
      newItems = [item];
    }
    console.log("INPUT VECTOR ", inputVectors.length, newItems.length);
    for (let i = 0; i < newItems.length; i++) {

      newItems[i].vector = inputVectors[i];
      if (newItems[i]?.metadata === undefined) {
        newItems[i].metadata = {};
      }
      newItems[i].metadata.index = itemsTotal + 1;
    };
    get().add(newItems, itemsTotal);

    /*  item.vector = inputVector;
     if (item?.metadata === undefined) {
       item.metadata = {};
     }
 
     item.metadata.index = itemsTotal + 1;
 
     const newItem = { ...item };
     set((state) => ({
       items: [...state.items, newItem],
       itemCount: itemsTotal + 1
     })) */
    //console.log(get().getItems());
    /*  const inputVector = await FeatureExtraction(item.text);
     item.vector = inputVector.embeddings[0].floatEmbedding;
     const norm = ItemSelector.normalize(item.vector);
     if (item?.metadata === undefined) {
       item.metadata = {};
     }
     const items = get().itemCount;
     item.metadata.index = items + 1;
 
     const newItem = { ...item, norm };
 
     set((state) => ({
       items: [...state.items, newItem],
       itemCount: items + 1
     })) */
  },
  delete: (index) =>
    set((state) => {
      const copiedItems = [...state.items]
      copiedItems.splice(index, 1)
      return { items: copiedItems }
    }),
  update: (index, item) =>
    set((state) => {
      const copiedItems = [...state.items]
      copiedItems[index] = { ...copiedItems[index], ...item }
      return { items: copiedItems }
    }),
  semanticSearch: async ({ text, score, filter, topK }) => {
    console.log("SEARCH ", text, score, filter, topK);
    const embbedings = await get().featureExtraction([text]);

    //const vector = embbedings.embeddings[0].floatEmbedding;
    const vector = embbedings[0];
    let items = get().items;
    if (filter) {
      items = items.filter(i => ItemSelector.select(i.metadata, filter));
    }

    const distances = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const distance = ItemSelector.cosineSimilarity(vector, item.vector);
      //console.log("DISTANCE ", distance, i);
      if (distance > score) {
        distances.push({ index: i, distance: distance });
      }
    }
    /* 
    const embbedings = await FeatureExtraction(text);
    const vector = embbedings.embeddings[0].floatEmbedding;
    let items = get().items;
    if (filter) {
      items = items.filter(i => ItemSelector.select(i.metadata, filter));
    }
    const norm = ItemSelector.normalize(vector);
    const distances = [];
    //const items = get().items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const distance = ItemSelector.normalizedCosineSimilarity(vector, norm, item.vector, item.norm);
      distances.push({ index: i, distance: distance });
    } */

    //console.log("DISTANCES START ", distances);
    // Sort by distance DESCENDING
    distances.sort((a, b) => b.distance - a.distance);
    //const top = distances.filter(d => (d.distance > score)).map(m => {
    const top = distances.slice(0, topK).map(m => {
      return {
        item: Object.assign({}, items[m.index]),
        score: Number(m.distance.toFixed(2))
      };

    });
    /*  // Find top k
     const top = distances.slice(0, topK).map(d => {
       return {
         item: Object.assign({}, items[d.index]),
         score: d.distance.toFixed(2)
       };
 
     }); */
    return top;
  }
}));