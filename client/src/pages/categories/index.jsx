import React, {useEffect, useMemo} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CategorySelector from "../../components/CategorySelector";

const Categories = () => {
    const { categories, categoriesLoading } = useSelector(state => state.general);

    const { id } = useParams();
    const category = useMemo(() => {
        return categories.find(c => c.id == id);
    }, [categories]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

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