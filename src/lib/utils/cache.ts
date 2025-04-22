export const CACHE_NAME = 'admin-users-cache';

export const cacheUtils = {
  generateCacheKey: (page: number, perPage: number, isVoted: string, divisi: string) => {
    return `users-${page}-${perPage}-${isVoted}-${divisi}`;
  },

  async setCacheData<T>(key: string, data: T): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = new Response(JSON.stringify(data));
      await cache.put(key, response);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },

  async getCacheData<T>(key: string): Promise<T | null> {
    try {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(key);
      if (response) {
        return response.json();
      }
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  async clearCache(): Promise<void> {
    try {
      await caches.delete(CACHE_NAME);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
};