import GlobalMessage from "../utils/GlobalMessage";

import PromptComponent from "../components/Prompt/Prompt";
import PaginationSconst from "../components/PaginationS/PaginationS";
// 组件自动加类型  React

declare module "vue" {
    interface GlobalComponents {
        GlobalMessage : typeof GlobalMessage,

        PromptComponent : typeof PromptComponent,
        PaginationSconst : typeof PaginationSconst,
    }
}