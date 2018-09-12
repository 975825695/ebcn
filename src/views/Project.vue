<template>
    <div class="container" height="200">
      <div class="main">
        <router-link :to="{path:'section'}">
          <div class="project-name">
            <div class="project-title project-title-home">
              课程体系
            </div>
          </div>
        </router-link>
        <div>
            <!-- target="_blank" -->
              <div class="project-new">
                <div class="project-img">
                  <img src="@/assets/add.png" alt="">
                </div>
                <div class="project-new-title">
                  新建项目
                </div>
              </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  data (){
    return{
      isProject: false,
      currentUser: ''
    }
  }
}
</script>
<style lang="scss" scoped>
    .container {
      display: flex;
      width: 80%;
      /* width: 1440px; */
      align-items: center;
      justify-content: center;
    }

    .main {
      width: 1040px;
      margin: 70px auto 140px;
      overflow: hidden;
    }

    .project-name {
      float: left;
      width: 242px;
      height: 270px;
      margin: 8px 8px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 30px;
      cursor: pointer;
    }

    .project-name:hover {
      box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.13);
    }

    .project-title {
      /* font-family: SourceHanSansCN-Bold; */
      font-weight: 600;
      font-size: 24px;
      line-height: 40px;
      color: #4E4E4E;
      text-align: center;
      letter-spacing: 0.2px;
      margin-bottom: 20px;
    }

    .project-title.project-title-home > div {
      line-height: 270px;
      color: #4e4e4e;
    }
    .project-new {
      float: left;
      width: 242px;
      height: 270px;
      margin: 8px 8px;
      box-sizing: border-box;
      padding: 30px;
      cursor: pointer;
      border: 3px dotted #E4E9EC;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .project-new .project-img{
      width: 36px;
      height: 36px;
    }
    .project-new .project-img img{
      width: 36px;
      height: 36px;
    }
    .project-new-title {
      font-family: SourceHanSansCN-Bold;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #B4BFC6;
      text-align: center;
      letter-spacing: 0.2px;
    }
    /* .project-time {
      font-family: SourceHanSansCN-Normal;
      font-size: 12px;
      line-height: 24px;
      color: #A0A0A0;
      letter-spacing: 0.1px;
    } */

    a {
      text-decoration: none;
      color: #000;
    }
  </style>
</style>
