<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Mechmarket Post Assistant
        </q-toolbar-title>

        <div>Current version: {{version}} </div>
        <q-toggle
          color="indigo-10"
          v-model="darkMode"
          @input="changeDarkMode"
          checked-icon="nights_stay"
          unchecked-icon="wb_sunny"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          About
        </q-item-label>
        <About
          v-for="link in aboutLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>

.q-header {
  background-image: linear-gradient(
    to right,
    #fbc2eb 0%,
    #a6c1ee 51%,
    #fbc2eb 100%
  );
  background-size: 200% auto;
  transition: background-position 0.2s;
}

</style>

<script>
import About from 'components/About.vue'
import { version } from '../../package.json'

const linksData = [

  {
    title: 'Github',
    caption: 'github.com/Legoota/mmpa',
    icon: 'code',
    link: 'https://github.com/Legoota/Mechmarket-post-assistant'
  },
  {
    title: 'Made using Quasar',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { About },
  created () {
    this.darkMode = this.$q.dark.isActive
  },
  data () {
    return {
      leftDrawerOpen: null,
      aboutLinks: linksData,
      version: version,
      darkMode: null
    }
  },
  mounted () {
    this.leftDrawerOpen = false
  },
  watch: {
    '$q.dark.isActive' (val) { this.darkMode = val }
  },
  methods: {
    changeDarkMode (val) {
      this.darkMode = val
      this.$q.dark.set(val)
    }
  }
}
</script>
