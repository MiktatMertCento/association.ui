export const ServiceCalling = {
    getLastId: (props, collection) => {
        return new Promise((response, reject) => {
            props.getLastId(
                collection,
                ({ lastUserId }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(lastUserId);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getAdminList: (props) => {
        return new Promise((response, reject) => {
            props.getAdminList(
                ({ adminList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(adminList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getUserList: (props) => {
        return new Promise((response, reject) => {
            props.getUserList(
                ({ userList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(userList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getFirmList: (props) => {
        return new Promise((response, reject) => {
            props.getFirmList(
                ({ firmList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(firmList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getUserTypeList: (props) => {
        return new Promise((response, reject) => {
            props.getUserTypeList(
                ({ userTypes }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(userTypes);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getDistrictList: (props) => {
        return new Promise((response, reject) => {
            props.getDistrictList(
                ({ districtList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(districtList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getJobList: (props) => {
        return new Promise((response, reject) => {
            props.getJobList(
                ({ jobList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(jobList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getActivityKindList : (props) => {
        return new Promise((response, reject) => {
            props.getActivityKindList(
                ({ activityKindList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(activityKindList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },

    getForeignLanguageList: (props) => {
        return new Promise((response, reject) => {
            props.getForeignLanguageList(
                ({ foreignLanguageList }) => {
                    const status = new Promise(
                        (resolve, failed) => {
                            try {
                                resolve('Operation Start')
                            }
                            catch (error) {
                                failed('Operation failed')
                            }
                        }
                    );
                    status.then(() => {
                        response(foreignLanguageList);
                    })
                },
                ({ ERROR_MESSAGE }) => {
                    reject(ERROR_MESSAGE)
                }
            );
        })
    },
}