<template>
    <v-app dark>
        <TheNavigation />
        <v-main>
            <!-- <slot />   -->
            <TheBanner />
            <TheProjects />
            <TheServices />
            <TheResume />
            <TheContacts />
        </v-main>
        <TheFooter/>
    </v-app>
</template>
<style>
.v-container{
  max-width: 1170px;
  padding: 0;
}
.v-card .v-card-title {
    line-height: 1.25rem;
}
</style>