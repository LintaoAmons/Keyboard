# Lintao's keyboard

# 做来干嘛

1. 练练 `typscript` && `react`
2. 做一个快捷键管理的可视化小工具
   1. 可视
   2. 易搜索
   3. 配置序列化，可简单上传下载

# Try with Docker

```bash
docker run -d -p 3000:3000 lintao0o0/keyboard:0.0.3
```

# TODO
- [x] 配置实例
- [x] Modifier 在Config中可读，而不是现在的`1, 2, 3, 4`
- [ ] Overview item add highlight button to allow keyboard interaction by using things like `surgingkey`
  - [x] 当点击`highlight me`的时候, highlight 对应的键
  - [ ] `highlight` with modifiers