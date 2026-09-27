const bidHistory = document.getElementById("bid-history");

const bidInput1 = document.getElementById("bidder1-input")
const bidInput2 = document.getElementById("bidder2-input")
const bidButton1 = document.getElementById("bidder1-button")
const bidButton2 = document.getElementById("bidder2-button")
const bidsClear = document.getElementById("bids-clear")
const highestBid = document.getElementById("highest-bid")


const STORAGE_KEY = 'bids'


function loadBids(){
    const bidsFromStorage = localStorage.getItem(STORAGE_KEY)
    if(!bidsFromStorage) {return []}
    const formattedBids = JSON.parse(bidsFromStorage)
    return formattedBids
}

let bids = loadBids()

function saveBids(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bids))
}


console.log(bidHistory)
//place bid
function placeBid(bidderId, amount){
    const inputVal = Number(amount.value)
    if(inputVal < 1){return}
    bids.push({bidder: bidderId, amount: inputVal})
    saveBids()
    renderBids()
    renderHighestBidder()
} 
//clear bids
function clearBids(){
    localStorage.clear();
    bids = [];
    renderBids();
    bidInput1.value = '';
    bidInput2.value = '';
    renderHighestBidder();
}
//display bids
function renderBids(){
    bidHistory.innerHTML = bids
        .map(bid => {
            return `<li>
                <span>
                    ${bid.bidder}:
                </span>
                <span>
                    $${bid.amount}
                </span>
              </li>`
        }).join('')
}


//calc highest
function renderHighestBidder(){
    const highest = bids.reduce((h,v) =>  v.amount > (h?.amount || 0)? v : h, {})
    highestBid.innerHTML = `<div>${highest.bidder}</div><div>$${highest.amount}</div>`
    if (!highest.amount)highestBid.innerHTML = `<div>No Bids Yet</div>`
}

//event listeners
bidButton1.addEventListener('click', () => placeBid( 'Bidder 1',bidInput1))
bidButton2.addEventListener('click', () => placeBid( 'Bidder 2',bidInput2))
bidsClear.addEventListener('click', () => clearBids())

//render
renderBids()

renderHighestBidder()