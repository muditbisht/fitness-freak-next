import ajaxRequest from '@/utils/api-call';
import { API_DOMAIN } from '@/config';

async function fetchFromServer() {
    let res = await ajaxRequest('GET', `${API_DOMAIN}/question/getCategory`);
    // console.log('Res Data: ', res.data);
    if (res.data.success) {
        return res.data.categories_data;
    }

    return null;
}

interface CategoriesData {
    name: string;
    url: string;
}

export default async function fetchCategories(refresh = false) {
    try {
        let sessionStorage = window.sessionStorage;
        let categoriesJson = sessionStorage.getItem('categories');
        let categories: CategoriesData[];
        if (categoriesJson === null || refresh) {
            categories = await fetchFromServer();
            if (categories !== null) {
                sessionStorage.setItem('categories', JSON.stringify(categories));
            }
        } else {
            categories = JSON.parse(categoriesJson);
            // console.log('Session Storage: ',categories);
        }

        return categories;

    } catch (err) {
        console.error(err);
    }
}