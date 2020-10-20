var arrayOfIdsOfOwner;
var arrayOfIdsOnSale;
var arrayOfIdsToDisplayInMarket;
var arrayOfIdsToDisplayInOffers;

$(document).ready( async () => {//when page is loaded, get latest instance of blockchain
    await connectWallet();
    await initializeMarketplace();//make sure marketplace contract is approved as operator for user
    await createArraysToDisplay();//create arrays for display
    await buildMarket(arrayOfIdsToDisplayInMarket);//build market
    await buildOffers(arrayOfIdsToDisplayInOffers);//build offers
});

async function createArraysToDisplay() {
    arrayOfIdsOfOwner = await getBirdsOfOwner();
    arrayOfIdsOnSale = await getBirdsOnSale();
    for (let i = 0; i < arrayOfIdsOnSale.length; i++) {
        for (let j = 0; j < arrayOfIdsOfOwner.length; j++) {
            if (arrayOfIdsOnSale[i] == arrayOfIdsOfOwner[j]) {//turn flow around and work on pricing.
                arrayOfIdsToDisplayInOffers.push(arrayOfIdsOnSale[i]);
            } else {
                arrayOfIdsToDisplayInMarket.push(arrayOfIdsOnSale[i]);
            }
        }
    }
}

function appendBirdToMarket(dna, id) {
    marketBox(id);
    renderBird(`#BirdBox${id}`, birdDna(dna), id);
}

function appendBirdToOffers(dna, id) {
    offerBox(id);
    renderBird(`#BirdBox${id}`, birdDna(dna), id);
}

function marketBox(id) {//used for offers of other users
    var boxDiv =    `<div id="BirdBox` + id + `" class="col-lg-3 catalogBox m-2 light-b-shadow">
                        <div class="angryBird_Red">
                            <div class="tail">
                                <div class="tail_top"></div>
                                <div class="tail_middle"></div>
                                <div class="tail_bottom"></div>
                            </div>
                            <div class="feather">
                                <div class="feather_top"></div>
                                <div class="feather_bottom"></div>
                            </div>
                            <div class="bird_body">
                                <div class="bird_body bird_body_inner"></div>
                                <div class="deco_1"></div>
                                <div class="deco_2"></div>
                                <div class="deco_3"></div>
                                <div class="deco_4"></div>
                            </div>
                            <div class="belly"></div>
                            <div class="face">
                                <div class="eye eye_right">
                                    <div class="eyebrow"></div>
                                    <div class="pupil"></div>
                                </div>
                                <div class="eye eye_left">
                                    <div class="eyebrow"></div>
                                    <div class="pupil"></div>
                                </div>
                                <div class="beak">
                                    <div class="beak_upper"></div>
                                    <div class="beak_lower"></div>
                                </div>
                            </div>
                        </div>
                        
                        <br>
                        <div class="dnaDiv">
                            <b>
                                <div id="idData">
                                    ID:
                                    <span>` + id + `</span>
                                </div>
                                <div id="genData">
                                    GEN:
                                    <span id="generation` + id + `"></span>
                                </div><br>
                                <div id="mumData">
                                    MUM:
                                    <span id="mum` + id + `"></span>
                                </div>
                                <div id="dadData">
                                    DAD:
                                    <span align="right" id="dad` + id + `"></span><br>
                                </div><br>    
                                DNA:
                                        <span id="dnaTopFeather` + id + `"></span>
                                        <span id="dnaBodyFeather` + id + `"></span>
                                        <span id="dnaTopBeak` + id + `"></span>
                                        <span id="dnaBottomBeak` + id + `"></span>
                                        <span id="dnaEyesShape` + id + `"></span>
                                        <span id="dnaDecorationPattern` + id + `"></span>
                                        <span id="dnaDecorationAtEye` + id + `"></span>
                                        <span id="dnaDecorationMid` + id + `"></span>
                                        <span id="dnaDecorationSmall` + id + `"></span>
                                        <span id="dnaAnimation` + id + `"></span><br>
                                    <ul class="ml-4">
                                        <li class="bottomList"><span id="bottomeyetext` + id + `"></span></li>
                                        <li class="bottomList"><span id="bottomdecorationpatterntext` + id + `"></span></li>
                                        <li class="bottomList"><span id="bottomanimationtext` + id + `"></span></li>
                                    </ul>
                            </b>
                            <div class="input-group mb-3">
                            Asking Price:` + Pricevariable + ` Ξ 
                                <div class="input-group-append">
                                    <button id="buyButton` + id + `" class="btn btn-success" type="button" id="button-addon2">Buy Bird</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    $('.marketOffers').append(boxDiv);
}

function offerBox(id) {//used for offers of current user
    var boxDiv =    `<div id="BirdBox` + id + `" class="col-lg-3 catalogBox m-2 light-b-shadow">
                        <div class="angryBird_Red">
                            <div class="tail">
                                <div class="tail_top"></div>
                                <div class="tail_middle"></div>
                                <div class="tail_bottom"></div>
                            </div>
                            <div class="feather">
                                <div class="feather_top"></div>
                                <div class="feather_bottom"></div>
                            </div>
                            <div class="bird_body">
                                <div class="bird_body bird_body_inner"></div>
                                <div class="deco_1"></div>
                                <div class="deco_2"></div>
                                <div class="deco_3"></div>
                                <div class="deco_4"></div>
                            </div>
                            <div class="belly"></div>
                            <div class="face">
                                <div class="eye eye_right">
                                    <div class="eyebrow"></div>
                                    <div class="pupil"></div>
                                </div>
                                <div class="eye eye_left">
                                    <div class="eyebrow"></div>
                                    <div class="pupil"></div>
                                </div>
                                <div class="beak">
                                    <div class="beak_upper"></div>
                                    <div class="beak_lower"></div>
                                </div>
                            </div>
                        </div>
                        
                        <br>
                        <div class="dnaDiv">
                            <b>
                                <div id="idData">
                                    ID:
                                    <span>` + id + `</span>
                                </div>
                                <div id="genData">
                                    GEN:
                                    <span id="generation` + id + `"></span>
                                </div><br>
                                <div id="mumData">
                                    MUM:
                                    <span id="mum` + id + `"></span>
                                </div>
                                <div id="dadData">
                                    DAD:
                                    <span align="right" id="dad` + id + `"></span><br>
                                </div><br>    
                                DNA:
                                        <span id="dnaTopFeather` + id + `"></span>
                                        <span id="dnaBodyFeather` + id + `"></span>
                                        <span id="dnaTopBeak` + id + `"></span>
                                        <span id="dnaBottomBeak` + id + `"></span>
                                        <span id="dnaEyesShape` + id + `"></span>
                                        <span id="dnaDecorationPattern` + id + `"></span>
                                        <span id="dnaDecorationAtEye` + id + `"></span>
                                        <span id="dnaDecorationMid` + id + `"></span>
                                        <span id="dnaDecorationSmall` + id + `"></span>
                                        <span id="dnaAnimation` + id + `"></span><br>
                                    <ul class="ml-4">
                                        <li class="bottomList"><span id="bottomeyetext` + id + `"></span></li>
                                        <li class="bottomList"><span id="bottomdecorationpatterntext` + id + `"></span></li>
                                        <li class="bottomList"><span id="bottomanimationtext` + id + `"></span></li>
                                    </ul>
                            </b>
                            <div class="input-group mb-3">
                            Asking Price:` + Pricevariable + ` Ξ 
                            <div class="input-group-append">
                                <button id="cancelButton` + id + `" class="btn btn-danger" type="button" id="button-addon2">Cancel Offer</button>
                            </div>
                            </div>
                        </div>
                    </div>`
    $('.myOffers').append(boxDiv);
}

//Listener for buy buttons
$(`[id^='buyButton']`).on("click", async function() {
    var id = $(this).attr("id").substring(9);//extract bird ID from HTML.
    await cancelOffer(id);
    var index = arrayOfIdsToDisplayInOffers.findIndex(bird => bird === id);
    if (index >= 0) {//make sure element is in array
        arrayOfIdsToDisplayInOffers.splice(index, 1);//remove selected bird from array
    };
    arrayOfIdsToDisplayInCatalog.push(id);
    $('.myOffers').empty();//clear offer content
    await buildOffers(arrayOfIdsToDisplayInOffers);//repopulate offers with all birds that are for sale
});

//Listener for cancel buttons
$(`[id^='cancelButton']`).on("click", async function() {
    var id = $(this).attr("id").substring(12);//extract bird ID from HTML.
    await cancelOffer(id);
    var index = arrayOfIdsToDisplayInOffers.findIndex(bird => bird === id);
    if (index >= 0) {//make sure element is in array
        arrayOfIdsToDisplayInOffers.splice(index, 1);//remove selected bird from array
    };
    arrayOfIdsToDisplayInCatalog.push(id);
    $('.myOffers').empty();//clear offer content
    await buildOffers(arrayOfIdsToDisplayInOffers);//repopulate offers with all birds that are for sale
});