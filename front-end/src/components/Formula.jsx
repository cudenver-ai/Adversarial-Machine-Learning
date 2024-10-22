import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const MarkdownLatex = () => {
  const markdown = `

  $$\\text{score} = \\alpha \\cdot \\text{incorrect\\_ratio} + \\beta \\cdot \\text{avg\\_confidence\\_incorrect} + \\epsilon \\cdot \\frac{\\text{avg\\_confidence\\_gap}}{\\text{max\\_confidence\\_gap}} + \\gamma \\cdot \\left(1 - \\frac{\\text{avg\\_l2\\_perturbation}}{\\text{max\\_perturbation}}\\right) + \\delta \\cdot \\left(\\text{avg\\_ssim}\\right)$$
  `;

  return (
    <div>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  );
};

export default MarkdownLatex;
