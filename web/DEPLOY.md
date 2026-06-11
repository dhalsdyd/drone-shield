# 배포 가이드

## 로컬 실행

```bash
cd web
npm install
npm run dev
```

## GitHub Pages

1. GitHub에 `drone-shield` 저장소 생성 후 push
2. Settings → Pages → Source: **gh-pages** branch
3. push 시 `.github/workflows/deploy-web.yml` 자동 배포

**URL:** https://dhalsdyd.github.io/drone-shield/
