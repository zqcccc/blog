import React from 'react'
// import hljs from 'highlight.js'
// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript)

// import 'highlight.js/styles/github.css'

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/styles/prism";

export default class CodeBlock extends React.PureComponent {
  // constructor(props) {
  //   super(props)
  //   this.setRef = this.setRef.bind(this)
  // }

  static defaultProps = {
    language: null
  }

  // componentDidMount() {
  //   this.highlightCode()
  // }

  // componentDidUpdate() {
  //   this.highlightCode()
  // }

  // highlightCode = () => {
  //   hljs.highlightBlock(this.codeEl)
  // }

  render() {
    const { language, value } = this.props
    return (
      <SyntaxHighlighter language={language} style={atomDark}>
        {value}
      </SyntaxHighlighter>
    )
  }
}
