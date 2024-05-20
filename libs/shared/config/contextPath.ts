export enum wolfComponentEnum {
  WEB,
  API,
  WIDGET,
  WS,
}

export function getContextPath(component: wolfComponentEnum) {
  let contextPath = '';

  /**
   * Determine if we are running in the browser or in node.js. If we are
   * running in node.js, we will have access to the process.env object,
   * otherwise we will have access to the window._env_ object to get the
   * environment variables.
   */

  // eslint-disable-next-line no-undef
  const env =
    typeof process !== 'undefined' && process?.env
      ? process?.env
      : (window as any)._env_;

  if (!env) {
    return contextPath;
  }

  if (env.GLOBAL_CONTEXT_PATH) {
    contextPath += env.GLOBAL_CONTEXT_PATH + '/';
  }

  switch (component) {
    case wolfComponentEnum.API:
      if (env.API_CONTEXT_PATH) {
        contextPath += env.API_CONTEXT_PATH + '/';
      }
      break;
    case wolfComponentEnum.WEB:
      if (env.FRONT_BASE_CONTEXT_PATH) {
        contextPath += env.FRONT_BASE_CONTEXT_PATH + '/';
      }
      break;
    case wolfComponentEnum.WIDGET:
      if (env.WIDGET_CONTEXT_PATH) {
        contextPath += env.WIDGET_CONTEXT_PATH + '/';
      }
      break;
    case wolfComponentEnum.WS:
      if (env.WS_CONTEXT_PATH) {
        contextPath += env.WS_CONTEXT_PATH + '/';
      }
      break;
  }

  return contextPath;
}
