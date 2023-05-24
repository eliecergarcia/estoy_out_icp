import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT(name : Text, owner : Principal, content : [Nat8]) = this {
    // variables
    private let itemName = name;
    private var nftOwner = owner;
    private let imageBytes = content;

    // funcion obtener nombres
    public query func getName() : async Text {
        return itemName;
    };

    // funcion para obtener al dueño
    public query func getOwner() : async Principal {
        return nftOwner;
    };

    // funcion para obtener el asset
    public query func getAsset() : async [Nat8] {
        return imageBytes;
    };

    //funcion para obtener el id del canister
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };

    // funcion para transferirlo
    public shared (msg) func transferOwnership(newOwner : Principal) : async Text {
        if (msg.caller == nftOwner) {
            nftOwner := newOwner;
            return "Success";
        } else {
            return "Error: Not initated by NFT Owner.";
        };
    };

};
