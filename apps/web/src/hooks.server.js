import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from './lib/utils';

export const handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase('https://shopshop-pocketbase-backend.fly.dev');
  //event.locals.pb = new PocketBase('http://127.0.0.1:8090');
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (event.locals.pb.authStore.isValid) {
      //! The authRefresh() is more secure but it logs user out occasionaly.
      await event.locals.pb.collection('users').authRefresh();

      event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
    event.locals.user = undefined;
  }

  const response = await resolve(event);
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
  return response;
};
