const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface FoodMeta {
    price: string;
    difficulty: string;
    prepTime: string;
}

export interface Food {
    _id?: string;
    id?: number; 
    title: string;
    img: string;
    desc: string;
    meta: FoodMeta;
    email?: string;
    recipe?: string[];
}

/**
 * Fetch all foods from the backend
 * GET /api/foods
 */
export async function getAllFoods(): Promise<Food[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/foods`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch foods: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all foods:', error);
        throw error;
    }
}

/**
 * Fetch a single food by ID
 * GET /api/foods/:id
 */
export async function getFoodById(id: string): Promise<Food | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/foods/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch food: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching food by ID ${id}:`, error);
        throw error;
    }
}

/**
 * Create a new food
 * POST /api/foods
 */
export async function createFood(food: Omit<Food, '_id'>): Promise<{ id: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/foods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        });

        if (!response.ok) {
            throw new Error(`Failed to create food: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating food:', error);
        throw error;
    }
}

/**
 * Update an existing food
 * PUT /api/foods/:id
 */
export async function updateFood(id: string, food: Partial<Food>): Promise<{ modified: number }> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/foods/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        });

        if (!response.ok) {
            throw new Error(`Failed to update food: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating food ${id}:`, error);
        throw error;
    }
}

/**
 * Delete a food
 * DELETE /api/foods/:id
 */
export async function deleteFood(id: string): Promise<{ deleted: number }> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/foods/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete food: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error deleting food ${id}:`, error);
        throw error;
    }
}
