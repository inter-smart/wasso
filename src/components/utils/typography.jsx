import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

// ============================================================================
// Heading Variants
// ============================================================================

const headingVariants = cva("leading-tight font-light", {
  variants: {
    size: {
      h1: "text-[30px] sm:text-[40px] lg:text-[54px] 2xl:text-[65px] 3xl:text-[80px]",
      h2: "text-[26px] sm:text-[36px] lg:text-[48px] 2xl:text-[58px] 3xl:text-[70px]",
      h3: "text-[22px] sm:text-[32px] lg:text-[40px] 2xl:text-[48px] 3xl:text-[60px]",
      h4: "text-[15px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[30px]",
      h5: "text-[15px] sm:text-[16px] lg:text-[17px] 2xl:text-[20px] 3xl:text-[25px]",
      h6: "text-[14px] sm:text-[13px] lg:text-[14px] 2xl:text-[16px] 3xl:text-[20px]",
      h7: "text-[13px] 2xl:text-[14px] 3xl:text-[18px]",
      h8: "text-[20px] sm:text-[24px] lg:text-[30px] 2xl:text-[36px] 3xl:text-[45px]",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

// ============================================================================
// Text Variants
// ============================================================================

const textVariants = cva("leading-normal font-normal", {
  variants: {
    size: {
      p1: "text-[14px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[18px]",
      p2: "text-[13px] lg:text-[13px] 2xl:text-[13px] 3xl:text-[16px]",
    },
  },
  defaultVariants: {
    size: "p1",
  },
});

// ============================================================================
// Heading Component
// ============================================================================

/**
 * Heading component for rendering semantic heading elements with consistent styling
 *
 * @param {Object} props - Component props
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} [props.as='h1'] - HTML heading element to render
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} [props.size='h1'] - Size variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to render
 * @returns {JSX.Element}
 *
 * @example
 * <Heading size="h1">Main Title</Heading>
 * <Heading as="h2" size="h3">Subtitle</Heading>
 */
function Heading({ as = "h1", className, size = "h1", children, ...props }) {
  const Component = as;

  return (
    <Component className={cn(headingVariants({ size, className }))} {...props}>
      {children}
    </Component>
  );
}

Heading.displayName = "Heading";

Heading.propTypes = {
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  size: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// ============================================================================
// Text Component
// ============================================================================

/**
 * Text component for rendering text elements with consistent typography
 *
 * @param {Object} props - Component props
 * @param {'p'|'span'|'div'|'label'} [props.as='p'] - HTML element to render
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to render
 * @returns {JSX.Element}
 *
 * @example
 * <Text size="lg">Large paragraph</Text>
 * <Text as="span" size="sm">Small text</Text>
 */
function Text({ as = "p", className, size = "md", children, ...props }) {
  const Component = as;

  return (
    <Component className={cn(textVariants({ size, className }))} {...props}>
      {children}
    </Component>
  );
}

Text.displayName = "Text";

Text.propTypes = {
  as: PropTypes.oneOf(["p", "span", "div", "label"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// ============================================================================
// Exports
// ============================================================================

export { Heading, Text, headingVariants, textVariants };
