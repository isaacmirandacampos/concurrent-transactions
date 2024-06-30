import App from '../../server/app';

class TestApp extends App {
  // eslint-disable-next-line class-methods-use-this
  protected applyGlobalHooks() {
    /** We are leaving this comment to scape eslint error
     * of empty methods
     *
     * We need this method to override ApplyGlobalHooks method on App class base
     * without it the hooks responsible for open and commit a transaction will be added and
     * we do not want this on tests.
     *
     * */
  }
}

export default TestApp;
