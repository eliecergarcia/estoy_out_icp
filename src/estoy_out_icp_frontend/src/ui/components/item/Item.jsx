import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from '../../../../../declarations/nft/index'
import { idlFactory as tokenIdlFactory } from "../../../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { estoy_out_icp_backend } from "../../../../../declarations/estoy_out_icp_backend";
import CURRENT_USER_ID from "../../../index";
import { PriceLabel } from "../pricelabel/PriceLabel";
import { Button } from 'antd';

export const Item = (props) => {
    const [name, setName] = useState();
    const [owner, setOwner] = useState();
    const [image, setImage] = useState();
    const [button, setButton] = useState();
    const [priceInput, setPriceInput] = useState();
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [blur, setBlur] = useState();
    const [sellStatus, setSellStatus] = useState("");
    const [priceLabel, setPriceLabel] = useState();
    const [shouldDisplay, setDisplay] = useState(true);

    const id = props.id;

    const localHost = "http://localhost:8080/";
    const agent = new HttpAgent({ host: localHost });

    //TODO: When deploy live, remove the following line.
    agent.fetchRootKey();
    let NFTActor;

    async function loadNFT() {
        NFTActor = await Actor.createActor(idlFactory, {
            agent,
            canisterId: id,
        });

        const name = await NFTActor.getName();
        const owner = await NFTActor.getOwner();
        const imageData = await NFTActor.getAsset();
        const imageContent = new Uint8Array(imageData);
        const image = URL.createObjectURL(
            new Blob([imageContent.buffer], { type: "image/png" })
        );

        setName(name);
        setOwner(owner.toText());
        setImage(image);

        if (props.role == "collection") {
            const nftIsListed = await estoy_out_icp_backend.isListed(props.id);

            if (nftIsListed) {
                setOwner("estoy_out_icp_backend");
                setBlur({ filter: "blur(4px)" });
                setSellStatus("Listed");
            } else {
                setButton(<Button handleClick={handleSell} text={"Sell"} />);
            }
        } else if (props.role == "discover") {
            const originalOwner = await estoy_out_icp_backend.getOriginalOwner(props.id);
            if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
                setButton(<Button handleClick={handleBuy} text={"Buy"} />);
            }

            const price = await estoy_out_icp_backend.getListedNFTPrice(props.id);
            setPriceLabel(<PriceLabel sellPrice={price.toString()} />);
        }
    }

    useEffect(() => {
        loadNFT();
    }, []);

    let price;
    function handleSell() {
        console.log("Sell clicked");
        setPriceInput(
            <input
                placeholder="Price in DANG"
                type="number"
                className="price-input"
                value={price}
                onChange={(e) => (price = e.target.value)}
            />
        );
        setButton(<Button onClick={sellItem}>Confirm</Button>);
    }


    async function sellItem() {
        setBlur({ filter: "blur(4px)" });
        setLoaderHidden(false);
        console.log("set price = " + price);
        const listingResult = await estoy_out_icp_backend.listItem(props.id, Number(price));
        console.log("listing: " + listingResult);
        if (listingResult == "Success") {
            const openDId = await estoy_out_icp_backend.getOpenDCanisterID();
            const transferResult = await NFTActor.transferOwnership(openDId);
            console.log("transfer: " + transferResult);
            if (transferResult == "Success") {
                setLoaderHidden(true);
                setButton();
                setPriceInput();
                setOwner("estoy_out_icp_backend");
                setSellStatus("Listed");
            }
        }
    }


    async function handleBuy() {
        console.log("Buy was triggered");
        setLoaderHidden(false);
        const tokenActor = await Actor.createActor(tokenIdlFactory, {
            agent,
            canisterId: Principal.fromText("<REPLACE WITH YOUR TOKEN CANISTER ID>"),
        });

        const sellerId = await estoy_out_icp_backend.getOriginalOwner(props.id);
        const itemPrice = await estoy_out_icp_backend.getListedNFTPrice(props.id);

        const result = await tokenActor.transfer(sellerId, itemPrice);
        if (result == "Success") {
            const transferResult = await estoy_out_icp_backend.completePurchase(
                props.id,
                sellerId,
                CURRENT_USER_ID
            );
            console.log("purchase: " + transferResult);
            setLoaderHidden(true);
            setDisplay(false);
        }
    }

    return (
        <div
            style={{ display: shouldDisplay ? "inline" : "none" }}
        >
            <div >
                <img
                    src={image}
                    style={blur}
                />
                <div hidden={loaderHidden}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div >
                    {priceLabel}
                    <h2 >
                        {name}
                        <span> {sellStatus}</span>
                    </h2>
                    <p>
                        Owner: {owner}
                    </p>
                    {priceInput}
                    {button}
                </div>
            </div>
        </div>
    )
}
