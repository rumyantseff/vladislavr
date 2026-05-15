<template>
  <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12">
    <div class="h-px w-full bg-linear-to-r from-transparent via-tertiary-font/30 to-transparent" />

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
      <!-- Brand block -->
      <div class="col-span-2 lg:col-span-1 flex flex-col gap-4">
        <div class="flex items-center gap-3 text-tertiary-font">
          <SharedLogo />
          <span class="font-bold text-xl">Vlad R.</span>
        </div>
        <p class="text-tertiary-font/60 text-sm leading-relaxed max-w-xs">
          IT Specialist combining DevOps, frontend craft, QA discipline and brand design.
        </p>
        <div class="flex items-center gap-2 mt-2">
          <SharedSocialIcon link="https://github.com/rumyantseff" label="GitHub">
            <SharedIconsGithub class="size-5" />
          </SharedSocialIcon>
          <SharedSocialIcon link="https://www.linkedin.com/in/vladislav-rumyantsev/" label="LinkedIn">
            <SharedIconsLinkedin class="size-5" />
          </SharedSocialIcon>
        </div>
      </div>

      <!-- Address -->
      <div class="flex flex-col gap-3">
        <h4 class="text-tertiary-font font-semibold">Address</h4>
        <p class="text-tertiary-font/60 text-sm leading-relaxed">
          Bratislava<br />Slovakia
        </p>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-3">
        <h4 class="text-tertiary-font font-semibold">Email</h4>
        <a href="mailto:vladik.rumyantsev@gmail.com"
          class="text-tertiary-font/60 hover:text-tertiary-font transition-colors text-sm break-all">
          vladik.rumyantsev@gmail.com
        </a>
      </div>

      <!-- Phone -->
      <div class="flex flex-col gap-3">
        <h4 class="text-tertiary-font font-semibold">Phone</h4>
        <a href="tel:+421000000000"
          class="text-tertiary-font/60 hover:text-tertiary-font transition-colors text-sm">
          +421 XXX XXX XXX
        </a>
      </div>
    </div>

    <div class="pt-3 lg:pt-4 text-center text-tertiary-font/50 text-[11px] sm:text-xs relative">
      <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-tertiary-font/30 to-transparent" />
      All rights reserved © Vlad Rumyantsev
    </div>
  </div>
</template>
