import React, {useEffect, useMemo} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CategorySelector from "../../components/CategorySelector";

const Categories = () => {
    const { categories, categoriesLoading } = useSelector(state => state.general);

    const { id } = useParams();
    // const { pathname } = useLocation();
    const category = useMemo(() => {
        return categories.find(c => c.id == id);
    }, [categories, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id])

    console.log(category)
    return (
        <div>
            {category &&
                <CategorySelector category={category} />
            }

        </div>
    );
};

export default Categories;