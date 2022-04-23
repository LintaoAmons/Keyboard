# Lintao's keyboard

# 做来干嘛

1. 练练 `typscript` && `react`
2. 做一个快捷键管理的可视化小工具
   1. 可视
   2. 易搜索
   3. 配置序列化，可简单上传下载

# Try with Docker

- copy the following command and run it in your terminal
    ```bash
    $ docker run -d -p 3000:80 lintao0o0/keyboard:0.2.5
    ```
- then go to `http://localhost:3000`

# TODO
- [x] Add scenario
- [x] fix scenario switch highlight
- [ ] key sequence shortcuts visualization
- [ ] string type keycode to enum
- [ ] highlightMe button --> clickable row
- [ ] 通过点击键盘的按键，交互式地增加快捷键配置
