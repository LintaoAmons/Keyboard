# Lintao's keyboard

# 做来干嘛

1. 练练 `typscript` && `react`
2. 做一个快捷键管理的可视化小工具
   1. 可视
   2. 易搜索
   3. 配置序列化，可简单上传下载

# Try it ｜ 来试试

[点这里 | Click here](https://oatnil.top/keyboard/)

## 前端only版本
前端Only的版本为 `0.2.7` 版本，需要的话，可以checkout到 `11bd66e71c596d107cfb359be0dc3311197fadb1` commit

对应的docker镜像 `docker pull lintao0o0/keyboard:0.2.7`

# 后端项目

[github](https://github.com/LintaoAmons/keyboard-backend)

# TODO
- [x] Add scenario
- [x] fix scenario switch highlight
- [x] 用户可以保存修改以及直接从系统中调出自己的配置（不用粘贴进来）
  - [x] Backend impl (https://github.com/LintaoAmons/keyboard-backend)
  - [x] 提升开发体验
    - [x] Api generate from openApi 
    - [x] Nginx reverse proxy
  - [x] replace `core/type` with generated type
- [ ] key sequence shortcuts visualization
- [ ] string type keycode to enum
- [ ] highlightMe button --> clickable row
- [ ] 通过点击键盘的按键，交互式地增加快捷键配置
