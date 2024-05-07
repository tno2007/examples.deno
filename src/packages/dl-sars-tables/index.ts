import ky from 'ky';

import {
    DOMParser,
    Element,
} from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";
//import { stringsFromTable } from "https://deno.land/x/html_table_parser@0.0.2/mod.ts";
//import { parseDocument } from "https://deno.land/x/html_parser@v0.1.3/src/mod.ts";
import { existsSync } from "https://deno.land/std@0.224.0/fs/mod.ts";



const jsonUrl = "https://jsonplaceholder.typicode.com/todos/1";
const url = "https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/";

const baseUrl = "https://www.sars.gov.za";
const resource = "tax-rates/income-tax/rates-of-tax-for-individuals/";

// get the base64 hash of the url to download
const hash = btoa(url);

const cachedUrl = `${hash}.html`;
let html = "";

// check if the cached file exists in the folder
if (existsSync(cachedUrl)) {
    html = Deno.readTextFileSync(cachedUrl);
    // TODO: parse the cached file
} else {
    // download the file and parse it
    html = await ky.get(url).text();
    // save the file in the cache
    Deno.writeTextFileSync(cachedUrl, html);
}

const doc = new DOMParser().parseFromString(html, "text/html");
if (doc === null) {
    throw new Error("Failed to parse HTML");
}

const table = doc.querySelector(".ms-rteTable-default");

// table.

// const table: string[][] = stringsFromTable(table);

// console.log(p?.innerHTML);
