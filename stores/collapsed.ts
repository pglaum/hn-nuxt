export const useCollapsedStore = defineStore('collapsed', {
    state () {
        return {
            collapsed: [] as Number[],
        }
    },
    getters: {
        isCollapsed: (state) => (id: Number) => state.collapsed.includes(id),
    },
    actions: {
        collapse (id: Number) {
            if (this.collapsed.includes(id)) {
                return
            }
            this.collapsed.push(id)
            const el = document.getElementById(`comment-${id}`)
            if (el) {
                el.scrollIntoView({ behavior:'smooth', })
            }
        },
        expand (id: Number) {
            if (!this.collapsed.includes(id)) {
                return
            }
            const idx = this.collapsed.findIndex((i: Number) => i === id)
            this.collapsed.splice(idx, 1)
        },
    },
})
