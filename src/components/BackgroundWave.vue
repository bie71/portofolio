<template>
  <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" class="waveanimate fixed z-[-9999]">
    <defs>
      <path
        id="sineWave"
        fill="#0F62FE"
        fill-opacity="0.2"
        d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0"
      />
    </defs>
    <use class="wave" href="#sineWave" />
    <use class="wave" x="-100%" href="#sineWave" />
    <use class="wave1" href="#sineWave" />
    <use class="wave1" x="-100%" href="#sineWave" />
    <use class="wave2" href="#sineWave" />
    <use class="wave2" x="-100%" href="#sineWave" />
  </svg>
</template>
