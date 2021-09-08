### read me if you is lost

ok so we have our backend heroku serrver up and running and set in our tokens.json.

Our contract is not compiling due to some silidity version comiler error. 

It says I have shit depending on ^0.8.0 and after changing my contract to 0.8.0 its still fucked.

This is where to pick up.

OH SHIT

we are compiled...

-need to write tests
-test
-test minting
-see if we can do this without a frontend preferrably


## we on ropsten bih (09/7/2021)

at address: 0x6D17091009D91ffc967bC57d959C9E412c6cF776

# 09/08/2021
## server/routing predicament

So I have my backend deployed and my frontend deployed.
 
The backend consists of a server.js which spins up a koa server that should serve metadata and /images, and then I have a router.js that handles requests.

In my tokens.json I have the metadata for tokenId 0 that contains the name, description and image url. Currently the image url is just the base url to my backend app (with the forward slash for appending). Fwiu 
there should be some witchcraft between my router and server that I am missing. Even with manually entering '0.svg' from a test render, it isnt being served. The tokenId is not being appended and not getting served...

Now that I'm thinking this out it feels like I need to write some scripts for my backend so that it can talk with the blockchain...

My goal is that at mint, my script uses the seed that is generated during the tx to influence randomness for their Stems banner. 

My frontend is maybe kinda trying to do that but my backend needs to be able to fetch the newly generated Stems banner to store in images and name it the appropriate tokenId.


Any idea on how to fetch the generated Stems banner and the corresponding tokenId and store it in the right folder on my backend?


### new ropsten address

0x1A565507903C81FBC617bD5483440b8c39789606

#### so i had to inherit ERC721URIStorage and override _burn() and tokenURI() but now after minting a token its tokenURI should be properly set.

