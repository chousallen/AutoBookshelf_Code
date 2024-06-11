import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import ApolloProvider from "../ApolloProvider";
import "../App.css";

const KILL = gql`
    mutation Kill($id: ID!) {
        kill(id: $id) {
            id
        }
    }
`;

const Egg = () => {
    //const [kill] = useMutation(KILL);
    const [kill] = useMutation(KILL);
    const selfDestruct = async (id) => {
        await kill({ variables: { id } });
    };

    return (
        <div className="container">
            <h1 id="title">Hyper Speed Ultra Ferris Wheel</h1>
            <button className="danger" onClick={() => selfDestruct(1)}>Self Destruct</button>
        </div>
    );
};

const Easter = () => (
    <ApolloProvider>
        <Egg />
    </ApolloProvider>
);

export default Easter;