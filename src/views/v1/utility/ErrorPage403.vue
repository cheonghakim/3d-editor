<template>
  <div class="account-pages p-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center mb-5">
            <h1 class="display-2 fw-medium">403</h1>
            <h4 class="text-uppercase">
              권한이 없습니다.<i class="mdi mdi-emoticon-sad-outline fs-24"></i>
            </h4>
            <div class="mt-5 text-center">
              <router-link :to="{ path: '/' }" class="btn btn-info text-white"
                >돌아가기</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
