/**
 * isDev - use node env to return if current env is development
 * @function
 * @return {boolean}
 */
export const isDev = () => process.env.NODE_ENV === 'development';
