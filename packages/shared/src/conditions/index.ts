// TODO: Do we want structured exports in @nucypher/shared?
import * as base from './base';
import * as predefined from './predefined';

// TODO: Or do we want to export everything from the base and predefined modules?
export * from './base';
export * from './predefined';

export {
  CompoundConditionType,
  type CompoundConditionProps,
} from './compound-condition';
export { Condition, type ConditionProps } from './condition';
export {
  ConditionExpression,
  type ConditionExpressionJSON,
} from './condition-expr';
export { ConditionContext, type CustomContextParam } from './context';
export { base, predefined };
