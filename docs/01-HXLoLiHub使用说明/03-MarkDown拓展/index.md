# MarkDown 拓展
## 一、图片拓展

Markdown 中的图片是无法控制宽高的, 通常图片的显示大小就是图片本身的大小.

因此我们拓展了它的语法, 使其可以控制:

- 图片宽度
- 图片圆角

![text ##w300##](./misaka03.jpg)

```markdown
![text](./misaka03.jpg)
```

其具体的示例是:

![text ##w200##r50##](./misaka03.jpg)

```markdown
![text ##w200##r50##](./misaka03.jpg)
```

如果你想控制图片的宽度, 可以在图片名称后增加`##w200##`, 图片的宽度就为 200 像素.

同理, 控制图片圆角就可以使用`##r10##`.

> [!TIP]
> 宽度可以是百分比, 只需要在`w200`末尾增加百分号`%`即可(超过 100%无效), 如果不加百分号, 则默认单位为像素(px). (圆角同理)
>
> 本语法学习自 [Blossom 图片拓展](https://www.wangyunf.com/blossom-doc/guide/markdown.html#image) (**但不是完全兼容**)

## 二、组合代码块 (LeetCode同款)

对于普通的 MarkDown 代码块, 它只能在竖向排列多个:

```cpp
std::cout << "C++" << '\n';
```

```java
System.out.println("Java");
```

```python
print("Python")
```

这样子对于一些同样作用的内容, 在浏览的时候会变得麻烦, 你需要不停的滑动才可以查看到内容. 并且更多的时候, 你还需要提供文本说明. 可明明是一类东西, 这样会显然内容很臃肿.

因此, 我实现了力扣同款组合代码块, 使其在样式上和 MarkDown 语法上都和力扣语法无异:

```cpp [g1-C++]
std::cout << "C++" << '\n';
```

```java [g1-Java]
System.out.println("Java");
```

```python [g1-Python]
print("Python")
```

语法:

````markdown
```cpp [g1-C++]
std::cout << "C++" << '\n';
```

```java [g1-Java]
System.out.println("Java");
```

```python [g1-Python]
print("Python")
```

# 通用语法:
> 只要它们使用相同的分组名, 就会被解析到同一个代码块, 无论是在文章的何处!

```语言 [分组名1-标题1]
// 代码块内容
```

```语言 [分组名1-标题2]
// 代码块内容
```
````

> [!WARNING]
> - 只要它们使用**相同的分组名**, 就会被解析到同一个代码块, **无论是在文章的何处**! *(只要是同一篇文章内)*
>
> - 标题名称 **不能** 相同! 否则是 UB (未定义行为)

## 三、可编辑的代码块 (内嵌VsCode同款编辑器)

对于一般的 MarkDown 文档, 它仅支持一键复制代码, 可很多我们需要复制的时候, 实际上都是一些记不得的命令:

例如, 以下命令, 它有很多参数, 而且参数大多是在中间的, 这如果直接复制粘贴到命令行上, 移动光标会比较麻烦.

```shell
# 随便编的命令
fk [本地路径] (目标URL) <目标对象名称> {目标对象邮箱} top-back
```

故此, 我思考: 如果可以提供一个临时编辑区, 这样会不会方便很多? 所以, 我直接内嵌一个`monaco-editor`编辑器, 其效果如下:

```shell vscode
# 随便编的命令
fk [本地路径] (目标URL) <目标对象名称> {目标对象邮箱} top-back
```

这样, 我们就可以对文本进行编辑, 并且 **不会** 对原内容产生影响! 并且本质是一个`VsCode`编辑器, 因此代码提示、代码折叠、搜索...等功能都具备. 并且贴心的准备了一键还原按钮, 您现在可以尝试对文本进行编辑操作, 自行体会一下~

其语法也很简单, 仅需要在语言后面添加一个`vscode`即可:

````markdown
```shell vscode
# 随便编的命令
fk [本地路径] (目标URL) <目标对象名称> {目标对象邮箱} top-back
```
````

> [!TIP]
> 目前并 **不支持** `组合代码块`和`可编辑代码块`混用

## 四、Mermaid 图表渲染

非行内公式在代码块的基础上进行拓展, 在 **```** 后填写`mermaid`, 来指定代码块内容为 [Mermaid](https://mermaid.nodejs.cn/) 语法, 如下:

````markdown
```mermaid
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```
````

则会被渲染为:

```mermaid
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

同时, 它也支持和组合代码块混合使用:

```mermaid [g2-基础流程图]
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```

```mermaid [g2-提交流程图]
gitGraph:
    commit "Ashish"
    branch newbranch
    checkout newbranch
    commit id:"1111"
    commit tag:"test"
    checkout main
    commit type: HIGHLIGHT
    commit
    merge newbranch
    commit
    branch b2
    commit
```

```mermaid [g2-Tcp数据包]
---
title: "TCP Packet"
---
packet-beta
0-15: "Source Port"
16-31: "Destination Port"
32-63: "Sequence Number"
64-95: "Acknowledgment Number"
96-99: "Data Offset"
100-105: "Reserved"
106: "URG"
107: "ACK"
108: "PSH"
109: "RST"
110: "SYN"
111: "FIN"
112-127: "Window"
128-143: "Checksum"
144-159: "Urgent Pointer"
160-191: "(Options and Padding)"
192-255: "Data (variable length)"
```

## 五、可在线编辑的 `.drawio.svg`

我个人有一个需求, 就是在 MarkDown 上做思维导图, 而市面上大部分的思维导图都是直接渲染为图片在 MarkDown 上.

这对于少量内容的思维导图还好, 但如果内容很多, 渲染出来的图片就会糊得不行, 即便放大也看不清.

而且, 大多数思维导图都有自己规定的格式, 如 自定义的`json`、`xml`文件解析后, 才渲染; 亦或是闭源的、冷门的、二进制的文件. 这些都不方便保存或者迁移.

因此我现在使用 [Drawio](https://www.drawio.com/), 它提供了一种前端编辑器, 让我们轻松的预览与编辑, 并且 VsCode 有对应的 [插件](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio), 可以轻松的编辑.

并且, 它支持对`.drawio.svg`进行编辑, 编辑后的内容就和普通的`.svg`一样, 并且还可以在 Github 的 Readme 中作为图片被渲染出来.

> 也就是说, 它本身就是图片; 因此 即便您日后打算数据迁移, 也不会因为无法迁移`drawio`的数据而烦恼, 因为它们在普通的 MarkDown 渲染上, 只是被当做图片.

> [!TIP]
> Drawio 不仅支持`.drawio.svg`还支持`.drawio.png`与`.drawio`等文件格式, 可本库仅对`.svg`版本进行特化. 也就是 **不支持** 其他的 Drawio 文件格式!

说了这么多, 咱们直接看示例吧, 它首先是以图片的方式渲染出来:

![](./cpp.drawio.svg)

> [!TIP]
> 如果您需要细看, 可以尝试点击右上角的`编辑`, 它会打开一个新的窗口, 这样就可以直接编辑和预览. (保存是不会影响到原文件的)

其语法也很简单, 和普通的图片语法没有区别, 只要它是`.svg`结尾的, 都会被渲染为"可编辑的":

```markdown
![](./cpp.drawio.svg)
```

> [!WARNING]
> 语法日后可能会修改, 因为不是所有的`.svg`都是 Drawio 文件, 理论上日后应该是在配置文件中配置开关, 选择是默认以`.svg`渲染, 还是需要`##drawio##` 才渲染.

## 六、Katex 数学公式

数学公式依赖于 [Katex](https://github.com/KaTeX/KaTeX)

### 6.1 行内公式

行内公式在单行代码块的基础上进行拓展, 你需要在 `$$` 内部书写 $KaTeX$ 语法, 如下:

这是一个行内公式: $f(x) = \int_{-\infty}^\infty  \hat f(x)\xi\,e^{2 \pi i \xi x}  \,\mathrm{d}\xi$

它写做:

```markdown
这是一个行内公式: $f(x) = \int_{-\infty}^\infty  \hat f(x)\xi\,e^{2 \pi i \xi x}  \,\mathrm{d}\xi$
```

### 6.2 非行内公式
非行内公式除了支持官方的 `$$` 语法外, 还支持在代码块```后填写 katex, 来指定代码块内容为 $KaTeX$ 语法, 如下:

$$
\left\{ \begin{array}{l}
0 = c_x-a_{x0}-d_{x0}\dfrac{(c_x-a_{x0})\cdot d_{x0}}{\|d_{x0}\|^2} + c_x-a_{x1}-d_{x1}\dfrac{(c_x-a_{x1})\cdot d_{x1}}{\|d_{x1}\|^2} \\[2ex]
0 = c_y-a_{y0}-d_{y0}\dfrac{(c_y-a_{y0})\cdot d_{y0}}{\|d_{y0}\|^2} + c_y-a_{y1}-d_{y1}\dfrac{(c_y-a_{y1})\cdot d_{y1}}{\|d_{y1}\|^2} \end{array} \right.
$$

语法:

````markdown
$$
\left\{ \begin{array}{l}
0 = c_x-a_{x0}-d_{x0}\dfrac{(c_x-a_{x0})\cdot d_{x0}}{\|d_{x0}\|^2} + c_x-a_{x1}-d_{x1}\dfrac{(c_x-a_{x1})\cdot d_{x1}}{\|d_{x1}\|^2} \\[2ex]
0 = c_y-a_{y0}-d_{y0}\dfrac{(c_y-a_{y0})\cdot d_{y0}}{\|d_{y0}\|^2} + c_y-a_{y1}-d_{y1}\dfrac{(c_y-a_{y1})\cdot d_{y1}}{\|d_{y1}\|^2} \end{array} \right.
$$

# 某些编辑器中, 使用如下方式编辑公式
```katex
$$
\left\{ \begin{array}{l}
0 = c_x-a_{x0}-d_{x0}\dfrac{(c_x-a_{x0})\cdot d_{x0}}{\|d_{x0}\|^2} + c_x-a_{x1}-d_{x1}\dfrac{(c_x-a_{x1})\cdot d_{x1}}{\|d_{x1}\|^2} \\[2ex]
0 = c_y-a_{y0}-d_{y0}\dfrac{(c_y-a_{y0})\cdot d_{y0}}{\|d_{y0}\|^2} + c_y-a_{y1}-d_{y1}\dfrac{(c_y-a_{y1})\cdot d_{y1}}{\|d_{y1}\|^2} \end{array} \right.
```
````

- 同样的, 它也支持和组合代码块混合使用:

```latex [g3-不会的公式] 
\begin{array}{c} 
  H_{n}=\frac{n}{\sum \limits_{i=1}^{n}\frac{1}{x_{i}}}= \frac{n}{\frac{1}{x_{1}}+ \frac{1}{x_{2}}+ \cdots + \frac{1}{x_{n}}} \\ G_{n}=\sqrt[n]{\prod \limits_{i=1}^{n}x_{i}}= \sqrt[n]{x_{1}x_{2}\cdots x_{n}} \\ A_{n}=\frac{1}{n}\sum \limits_{i=1}^{n}x_{i}=\frac{x_{1}+ x_{2}+ \cdots + x_{n}}{n} \\ Q_{n}=\sqrt{\sum \limits_{i=1}^{n}x_{i}^{2}}= \sqrt{\frac{x_{1}^{2}+ x_{2}^{2}+ \cdots + x_{n}^{2}}{n}} \\ H_{n}\leq G_{n}\leq A_{n}\leq Q_{n} 
\end{array}
```

```katex [g3-不懂的公式]
\begin{array}{l}  
  \nabla \cdot \mathbf{E} =\cfrac{\rho}{\varepsilon _0}  \\  
  \nabla \cdot \mathbf{B} = 0 \\  
  \nabla \times  \mathbf{E} = -\cfrac{\partial \mathbf{B}}{\partial t }  \\  
  \nabla \times  \mathbf{B} = \mu _0\mathbf{J} + \mu _0\varepsilon_0 \cfrac{\partial \mathbf{E}}{\partial t }   
\end{array} 
```

> [!WARNING]
> 目前还未支持渲染化学公式等 $KaTeX$ 拓展内容.

## 七、多色引用块

目前仅支持 [Github 语法的语义化引用](https://github.com/orgs/community/discussions/16925) (基于 [remark-github-alerts](https://github.com/hyoban/remark-github-alerts) ).

> [!NOTE]
> 突出显示用户应考虑的信息，即使在浏览时也是如此。

> [!TIP]
> 帮助用户取得更大成功的可选信息。

> [!IMPORTANT]
> 用户成功所需的重要信息。

> [!WARNING]
> 由于存在潜在风险，需要用户立即关注的关键内容。

> [!CAUTION]
> 行为的潜在负面后果。

以下是其语法:

```markdown
> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
```