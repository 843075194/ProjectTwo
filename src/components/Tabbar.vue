<template>
    <div class="nav">
        <ul>
            <router-link to="/film" tag="li" active-class="kerwinactive">
               <a href="" active-class="kerwinactive">
                   <i class="iconfont">&#xe760;</i>
                   <span>电影</span>
               </a>
            </router-link>
            <router-link to="/cinema" tag="li" active-class="kerwinactive">
                <a href="" active-class="kerwinactive">
                   <i class="iconfont">&#xe820;</i>
                   <span>影院</span>
               </a>
            </router-link>
            <router-link to="/center" tag="li" active-class="kerwinactive">
                <a href="">
                   <i class="iconfont">&#xe724;</i>
                   <span>咨询</span>
               </a>
            </router-link>
            <router-link to="/center" tag="li" active-class="kerwinactive">
                <a href="">
                   <i class="iconfont">&#xe6f5;</i>
                   <span>我的</span>
               </a>
            </router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .nav{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 25px;
        text-align: center;
        background: white;
        z-index: 100;
        ul{
            display: flex;
            width: 100%;
            height: 50px;
            li{
                flex: 1;
                text-align: center;
                padding-top: 10px;
                a{
                    display: flex;
                    flex-direction: column;
                    i{
                        font-size: 18px;
                    }
                    span{
                            font-size: 12px;
                            line-height: 12px;
                    }
                }
            }
        }
    }

    .kerwinactive{
        color:red;
    }
</style>
