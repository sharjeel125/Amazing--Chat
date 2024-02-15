import { OpenAI } from "langchain/llms/openai";


const llm = new OpenAI({
    openAIApiKey: "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",
  });



const result = await llm.predict("What is map");
// "Feetful of Fun"


console.log(result)



// const { OpenAI } = require('openai'); // You'll need to install the OpenAI Node.js SDK
// import { RetrievalQAChain } from "langchain/chains";
// const { Pinecone } = require('langchain').vectorstores;
// const { OpenAIEmbeddings } = require('langchain').embeddings.openai;
// const { RecursiveCharacterTextSplitter } = require('langchain').text_splitter;
// const { SitemapLoader } = require('langchain').document_loaders.sitemap;
// const { PDFPlumberLoader } = require('langchain').document_loaders;
// const pinecone = require('pinecone-client');
// // const fetch = require('node-fetch');
// // const fs = require('fs');
// // const path = require('path');
// // const os = require('os');

// const OPENAI_API_KEY = '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';
// const PINECONE_API_KEY = '7dfe1705-9268-4371-a554-17044819ce53';
// const PINECONE_ENVIRONMENT = 'us-west4-gcp-free';
// const INDEX_NAME = 'ind';

// const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
// pinecone.init({ apiKey: PINECONE_API_KEY, environment: PINECONE_ENVIRONMENT });

// (async () => {
// //   const webscrapeLoader = new SitemapLoader(
// //     'https://carbonkerma.com/page-sitemap.xml'
// //     // filterUrls: ["https://ind.nl/en"]
// //   );

// //   const pdfLoader = new PDFPlumberLoader('./Muhammad_Sharjeel.pdf');

// //   const webData = await webscrapeLoader.load();
// //   const pdfData = await pdfLoader.load();

// //   const docs = webData.concat(pdfData);

// //   const textSplitter = new RecursiveCharacterTextSplitter({
// //     chunkSize: 1200,
// //     chunkOverlap: 200,
// //     lengthFunction: str => str.length,
// //   });

// //   const docsChunks = textSplitter.splitDocuments(docs);

//   const embeddings = new OpenAIEmbeddings();

//   const retriever = new Pinecone.Retriever({
//     indexName: INDEX_NAME,
//     embeddings: embeddings,
//   });

//   const llm = openai.create({ model: 'text-davinci-003', maxTokens: 100 });

//   const qaWithSources = RetrievalQAChain.fromChainType({
//     llm: llm,
//     chainType: 'stuff',
//     retriever: retriever,
//     returnSourceDocuments: true,
//   });

//   function getAnswer(message) {
//     const response = qaWithSources({ query: message });
//     const result = response.result;
//     return result;
//   }

//   const message = 'what is carbonkerma?';
//   const answer = await getAnswer(message);
//   console.log('Answer:', answer);
// })();
