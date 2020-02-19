#!/usr/bin/env node

const http = require('@zhangfuxing/http');
const colors = require('@zhangfuxing/colors/fn');
const baseUrl = 'http://fanyi.youdao.com/openapi.do';
const url = `${baseUrl}?keyfrom=bladetrans&key=902909552&type=data&doctype=json&version=1.1&q=`;
const params = process.argv.slice(2).join(' ');

async function translate() {
  const res = await http.get(url + params);
  if (res.errorCode !== 0) console.error(res);

  const { translation, web } = res;

  if (!Array.isArray(translation)) return;
  console.log(`
    - ${colors.green(translation.join(', '))}`);

  if (!web || !Array.isArray(web) || web.length == 0) return;

  let i = 1
  const print = web.reduce((pre, next) => {
    const { key, value } = next;
    return pre + `
    ${i++}. ${key ? colors.yellow(key) : ''} 
    ${value ? value.join(',') : ''} 
    `;
  }, '');

  console.log(print);
}

translate().catch(console.error);