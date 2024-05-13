/*
export const coreMockups = {
  query: {
     appVersion: (variables, Options) => {
*/
class ItemSelector {
  static cosineSimilarity(vector1, vector2) {
    return this.dotProduct(vector1, vector2) / (this.normalize(vector1) * this.normalize(vector2));
  }

  static normalize(vector) {
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
      sum += vector[i] * vector[i];
    }
    return Math.sqrt(sum);
  }

  static normalizedCosineSimilarity(vector1, norm1, vector2, norm2) {
    return this.dotProduct(vector1, vector2) / (norm1 * norm2);
  }

  static select(metadata, filter) {
    if (filter === undefined || filter === null) {
      return true;
    }

    for (const key in filter) {
      switch (key) {
        case '$and':
          if (!filter[key].every(f => this.select(metadata, f))) {
            return false;
          }
          break;
        case '$or':
          if (!filter[key].some(f => this.select(metadata, f))) {
            return false;
          }
          break;
        default:
          const value = filter[key];
          if (value === undefined || value === null) {
            return false;
          } else if (typeof value === 'object') {
            if (!this.metadataFilter(metadata[key], value)) {
              return false;
            }
          } else {
            if (metadata[key] !== value) {
              return false;
            }
          }
          break;
      }
    }
    return true;
  }

  static dotProduct(arr1, arr2) {
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
      sum += arr1[i] * arr2[i];
    }
    return sum;
  }

  static metadataFilter(value, filter) {
    if (value === undefined || value === null) {
      return false;
    }
    //console.log("FILTERING ", value);
    //console.log("FILTERING2 ", filter);

    for (const key in filter) {
      switch (key) {
        case '$eq':
          if (value !== filter[key]) {
            return false;
          }
          break;
        case '$ne':
          if (value === filter[key]) {
            return false;
          }
          break;
        case '$gt':
          if (typeof value !== 'number' || value <= filter[key]) {
            return false;
          }
          break;
        case '$gte':
          if (typeof value !== 'number' || value < filter[key]) {
            return false;
          }
          break;
        case '$lt':
          if (typeof value !== 'number' || value >= filter[key]) {
            return false;
          }
          break;
        case '$lte':
          if (typeof value !== 'number' || value > filter[key]) {
            return false;
          }
          break;
        case '$in':

          if (Array.isArray(value)) {
            //  console.log("FILTERING3 ");
            // console.log("FILTERING4 ", filter[key]);
            if (!value.every(val => filter[key].includes(val))) {
              return false;
            }
          } else if (typeof value === 'boolean' || !filter[key].includes(value)) {
            return false;
          }
          break;
        case '$nin':
          if (typeof value === 'boolean' || filter[key].includes(value)) {
            return false;
          }
          break;
        default:
          return value === filter[key];
      }
    }
    return true;
  }
}

export default ItemSelector;
