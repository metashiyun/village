![metaShiyun](https://static.shiyun.org/shiyun-logo-with-text.png)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

- `/api/v1` - the complete data
- `/api/v1/model` - all models
- `/api/v1/model/[id]` - the model with specific `id` (e.g. `2024`)
- `/api/v1/model/[id]/region` - all regions under a model
  - or with filter `type` (`public`, `private`), `level` (`1`, `2`, `3`, `4`)
- `/api/v1/model/[id]/region/[type]` - the region with specific id `type` (e.g. `pref`)
- `/api/v1/region` - all regions
  - or with filter `type` (`pref`, etc.)
- `/api/v1/region/[id]` - the region with specific `id` (e.g. `jd`)

## Editing Data

Data is stored in external storage, and should be automatically uploaded with each push to `main` branch. To edit data, edit `/app/regions.json`.

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [metaShiyun](https://www.shiyun.org)
