# Docusaurus 기술 연구

## 🛰️ Pages

### ⭐ Create

> `/src/pages/helloReact.tsx`

```ts title="/src/pages/helloReact.tsx"
import React from 'react';
import Layout from '@theme/Layout';

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        <p>
          Edit <code>pages/helloReact.js</code> and save to reload.
        </p>
      </div>
    </Layout>
  );
}
```

다음과 같이 접근 `http://localhost:3000/helloReact`


### ⭐ Routes

React 기반의 자유로운 페이지 생성

 - /src/pages/index.js → [baseUrl]
 - /src/pages/foo.js → [baseUrl]/foo
 - /src/pages/foo/test.js → [baseUrl]/foo/test
 - /src/pages/foo/index.js → [baseUrl]/foo/

> `_` will be ignored and no routes will be created for that file

> If you want to create reusable components into that directory, use the exclude option (by default, files prefixed with `_`, test files(`.test.js`), and files in `__tests__` directory are not turned into pages).

```
Duplicate Routes에 대해서

Docusaurus 페이지 요소는 pages/* 단독으로 만들어지는 요소가 아님(docs/*, blog/*)
따라서 같은 경로에 대해서 여러 개의 페이지가 실수로 생성될 수 있음
만일 겹치면 docusaurus.config.ts의 "onDuplicateRoutes" 옵션에 따라 
시작하거나 빌드할 때 경고 -> 사이트는 정상적으로 완료됨
마지막에 생성된 페이지가 접근 가능한 페이지가 됨
어떤 것이 마지막에 생성되는 페이지가 되는지는 공식 문서에서 발견하지 못함
onDuplicateRoutes: 'throw'로 설정해 CI에서 중복 발생 시 바로 실패하도록 만드는 방향 생각
```

## 🛰️ Docs

### ⭐ Create

```
website # root directory of your site
├── docs
│   └── greeting.md
├── src
│   └── pages
├── docusaurus.config.js
├── ...
```
> `greeting.md`

```mdx
---
description: 이 부분은 Front Matter 부분
---

# Hello from Docusaurus

Are you ready to create the documentation site for your open source project?

## Headers

will show up on the table of contents on the upper right

So that your users will know what this page is all about without scrolling down or even without reading too much.

## Only h2 and h3 will be in the TOC by default.

You can configure the TOC heading levels either per-document or in the theme configuration.

The headers are well-spaced so that the hierarchy is clear.

- lists will help you
- present the key points
- that you want your users to remember
  - and you may nest them
    - multiple times
```

### ⭐ Tags

> `docs/my-docs.md`

```mdx
---
tags:
  - Releases
  - docusaurus
---

# Title

Content
```

> `docs/tags.yml`

```yaml
docusaurus:
  label: 'Docusaurus'
  permalink: '/docusaurus'
  description: 'Docs related to the Docusaurus framework'
```

 - Release 태그는 `tags.yml`에 선언되지 않아 inline tag -> 메타데이터 역할만 함
 - docusaurus 태그는 `tags.yml`에 선언되어 predefined tag
   - 이 태그는 여러 문서에서 재사용할 수 있고, `/docusaurus` 경로로 접근 가능한 태그 페이지(자동 생성)도 생김

### ⭐ ID

모든 마크다운 document는 유일한 id를 가짐.
 - default: the ID of `greeting.md` is `greeting`, and the ID of `guide/hello.md` is `guide/hello`

자동으로 결정되는 id 중 **마지막 부분**은 사용자가 직접 front matter에서 지정할 수 있음

 - `guide/hello.md` -> `guide/part1`

```mdx
---
id: part1
---

Lorem ipsum
```

### ⭐ Routes

기본적으로 document의 URL은 ID로부터 파생됨.

만일 파일 이름이 아래와 같이 네이밍이 되어 있으면 그 파일 이름은 URL에 포함되지 않음

 - Named as index (case-insensitive): `docs/Guides/index.md`
 - Named as README (case-insensitive): `docs/Guides/README.mdx`
 - Same name as parent folder: `docs/Guides/Guides.md`

> All files prefixed with an underscore (_) under the docs directory are treated as "partial" pages and will be ignored by default.

#### - slug

```
website/
└── docs/
    └── guide/
        └── hello.md
```

> `hello.md`

```mdx
---
slug: /bonjour
---

...
```

위 문서는 기본 규칙을 덮어쓰고 원하는 경로를 지정할 수 있음 `/bonjour`

### ⭐ Sidebar

#### - way one to use siebars

Pass its path to the @docusaurus/plugin-docs plugin directly or via @docusaurus/preset-classic.

> `docusaurus.config.js`
>> The sidebars file is run with Node.js. You can't use or import browsers APIs, React or JSX in it.

```js
export default {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
      },
    ],
  ],
};
```

