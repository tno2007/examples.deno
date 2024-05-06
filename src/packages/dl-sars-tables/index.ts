import ky from 'ky';

import {
    DOMParser,
    Element,
} from "../../../vendor/deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

import { stringsFromTable } from "../../../vendor/deno.land/x/html_table_parser@0.0.2/mod.ts";
import { parseDocument } from "../../../vendor/deno.land/x/html_parser@v0.1.3/src/mod.ts";

const jsonUrl = "https://jsonplaceholder.typicode.com/todos/1";
const htmlUrl = "https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/";

const baseUrl = "https://www.sars.gov.za";
const resource = "tax-rates/income-tax/rates-of-tax-for-individuals/";



const html = await ky.get(htmlUrl).text();
//const domParser = new DOMParser().parseFromString("response")!;

// TODO: get first html table
//const table = doc.querySelector(".ms-rteTable-default")!;

const doc = new DOMParser().parseFromString(html, "text/html");
if (doc === null) {
    throw new Error("Failed to parse HTML");
}

const document = parseDocument(html);

const p = doc.querySelector(".ms-rteTable-default");
const table: string[][] = stringsFromTable(document);


console.log(p?.innerHTML);
