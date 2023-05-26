import React, { useState } from "react";
import { estoy_out_icp_backend } from "../../../../../declarations/estoy_out_icp_backend";
import { Item } from "../item/Item";
import { useForm } from "react-hook-form";

export const Minter = () => {
    const { register, handleSubmit } = useForm();
    const [nftPrincipal, setNFTPrincipal] = useState("");
    const [loaderHidden, setLoaderHidden] = useState(true);

    async function onSubmit(data) {
        setLoaderHidden(false);
        const name = data.name;
        const image = data.image[0];
        const imageArray = await image.arrayBuffer();
        const imageByteData = [...new Uint8Array(imageArray)];

        const newNFTID = await estoy_out_icp_backend.mint(imageByteData, name);
        console.log(newNFTID.toText());
        setNFTPrincipal(newNFTID);
        setLoaderHidden(true);
    }

    if (nftPrincipal == "") {
        return (
            <div >
                <div hidden={loaderHidden}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h3>
                    Create NFT
                </h3>
                <h6>
                    Upload Image
                </h6>
                <div >
                    <input
                        {...register("image", { required: true })}
                        type="file"
                        accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
                    />
                </div>
                <h6>
                    Collection Name
                </h6>
                <div>
                    <div>
                        <input
                            {...register("name", { required: true })}
                            placeholder="EstoyOut"
                            type="text"
                        />
                        <fieldset></fieldset>
                    </div>
                </div>
                <div >
                    <span onClick={handleSubmit(onSubmit)}>
                        Mint NFT
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h3>
                    Minted!
                </h3>
                <div>
                    <Item id={nftPrincipal.toText()} />
                </div>
            </div>
        );
    }
}
