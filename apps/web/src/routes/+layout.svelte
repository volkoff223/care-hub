<script>
  import { getImageURL } from '$lib/utils.js';
  import '../app.postcss';
  export let data;
  import defaultAvatar from '$lib/assets/default-avatar.jpg';
</script>

<div class="min-h-full">
  <nav class="navbar ba-base-100 border-b">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Care Hub</a>
    </div>
    <div class="flex-none">
      <!--Buttons for user not logged in-->
      {#if !data.user}
        <div class="dropdown dropdown-end">
          <a href="/login" class="btn btn-primary">Login</a>
        </div>
        <!--Buttons for user logged in-->
      {:else}
        {#if data.user.role === 'admin'}
          <!--Buttons for admin user-->
          <p>Admin</p>
        {:else}
          <!--Buttons for non-admin user-->
        {/if}
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                src={data.user?.avatar
                  ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
                  : defaultAvatar}
                alt="user avatar"
              />
            </div>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/my/settings">Settings</a>
            </li>
            <li>
              <form action="/logout" method="POST">
                <button type="submit" class="w-full text-start">Logout</button>
              </form>
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </nav>
  <div class="py-4">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <slot />
    </div>
  </div>
</div>
