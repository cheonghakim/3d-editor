<template>
  <div class="account-pages p-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-center mb-5">
            <h1 class="display-2 fw-medium">500</h1>
            <h4 class="text-uppercase">
              서버 에러<i class="mdi mdi-emoticon-sick-outline fs-24"></i>
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
