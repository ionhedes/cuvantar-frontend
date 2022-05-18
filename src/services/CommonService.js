import {useLocation, useNavigate, useParams} from "react-router-dom";
import React from "react";

export function* createGenerator(list) {
    yield* list;
}

export function attachRouter(ComponentWithoutRouter) {
    function ComponentWithRouter(props) {
        let params = useParams();
        let navigate = useNavigate(); // class components cannot use the useParams() hook, so we need a wrapping component;
        let location = useLocation();

        return (
            <ComponentWithoutRouter
                {...props}  // previous props
                router = {{ params, navigate, location }} // router - attached prop;
            />
        );
    }

    return ComponentWithRouter;
}