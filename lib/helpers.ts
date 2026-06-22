/**
 * Safely extract array from API response
 * Handles different response structures
 */
export function extractDataArray(response: any): any[] {
  if (!response) return [];
  
  // Case 1: response.data.data (paginated response from Laravel)
  if (response?.data?.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  
  // Case 2: response.data is array
  if (response?.data && Array.isArray(response.data)) {
    return response.data;
  }
  
  // Case 3: response itself is array
  if (Array.isArray(response)) {
    return response;
  }
  
  // Case 4: response.data.items
  if (response?.data?.items && Array.isArray(response.data.items)) {
    return response.data.items;
  }
  
  // Case 5: response has data property with items
  if (response?.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
    // Check for common pagination keys
    const possibleKeys = ['data', 'items', 'results', 'records'];
    for (const key of possibleKeys) {
      if (response.data[key] && Array.isArray(response.data[key])) {
        return response.data[key];
      }
    }
  }
  
  console.warn('Could not extract array from response:', response);
  return [];
}

/**
 * Extract pagination data from API response
 */
export function extractPagination(response: any): any {
  if (!response?.data) return null;
  
  const data = response.data;
  if (data.last_page !== undefined) {
    return {
      current_page: data.current_page || 1,
      last_page: data.last_page || 1,
      total: data.total || 0,
      per_page: data.per_page || 10,
    };
  }
  
  return null;
}