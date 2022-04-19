import SnackbarUtils from 'app/views/dernek/components/SnackbarUtils';
import { db, storage } from '../../config'
import sha256 from 'sha256'
import { v4 as uuidv4 } from 'uuid';

//Doğrulama işlemleri
export function tcNoValidate(tcNo) {
    tcNo = tcNo.toString();
    if (tcNo.length !== 11) return false;
    if (tcNo[0] === '0') return false;
    let tekToplam = 0, ciftToplam = 0, genelToplam = 0;
    for (let i = 0; i < tcNo.length - 2; i++) {
        if (i % 2 === 0) {
            tekToplam += parseInt(tcNo[i]);
        } else {
            ciftToplam += parseInt(tcNo[i]);
        }
        genelToplam += parseInt(tcNo[i])
    }
    if (((tekToplam * 7) - ciftToplam) % 10 !== parseInt(tcNo[tcNo.length - 2])) return false;
    genelToplam += parseInt(tcNo[9]);
    if (genelToplam % 10 !== parseInt(tcNo[10])) return false;
    return true;
}

//Get İşlemleri

export const getLastId = (collection, SuccessOperation, FailedOperation) => {
    return () => {
        db.collection(collection).orderBy('registerNo', 'desc').limit(1).get().then((querySnapshot) => {
            SuccessOperation({ lastUserId: querySnapshot.docs[0].data().registerNo })
        }).catch((error) => {
            FailedOperation(error);
        });
    }
}


//Admin İşlemleri

export const getAdminList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').where("userType", "==", "admin").where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const adminList = [];
            querySnapshot.forEach(function (doc) {
                adminList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ adminList: adminList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerAdmin = (admin, SuccessOperation, FailedOperation) => {
    return () => {
        if (tcNoValidate(admin.idNo)) {
            db.collection('users').where("idNo", "==", admin.idNo).where('status', '==', 1).get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    db.collection('users').where("registerNo", '==', admin.registerNo).get().then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            const refDatabase = db.collection('users');

                            refDatabase.add({
                                registerNo: admin.registerNo,
                                idNo: admin.idNo,
                                city: admin.city,
                                name: admin.name,
                                surname: admin.surname,
                                password: sha256(admin.password),
                                registerDate: new Date(),
                                userType: "admin",
                                status: 1,
                            }).then(() => {
                                SnackbarUtils.success('Başarıyla eklendi!');
                                SuccessOperation({});
                            }).catch(error => {
                                console.log("================>I'm in error<================", error)
                                FailedOperation({ errorMsg: error });
                            });
                        }
                        else {
                            SnackbarUtils.error('Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!');
                            FailedOperation({ errorMsg: 'Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!' });
                        }
                    })
                } else {
                    SnackbarUtils.error('Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!');
                    FailedOperation({ errorMsg: 'Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!' });
                }
            })
        } else {
            SnackbarUtils.error('Geçersiz kimlik numarası!');
        }
    }
}

export const updateAdmin = (admin, oldAdmin, adminId, SuccessOperation, FailedOperation) => {
    return () => {
        if (tcNoValidate(admin.idNo)) {
            if (admin.idNo !== oldAdmin.idNo) {
                db.collection("users").where("idNo", "==", admin.idNo).where('status', '==', 1).get().then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        SnackbarUtils.error('Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!');
                    } else {
                        const REF_DATABASE = db.collection('users').doc(adminId);

                        REF_DATABASE.update(Object.assign({
                            idNo: admin.idNo,
                            city: admin.city,
                            name: admin.name,
                            surname: admin.surname,
                            updateDate: new Date(),
                        }, admin.password !== "" && { password: sha256(admin.password) })).then(() => {
                            SnackbarUtils.success('Başarıyla güncellendi!');
                            SuccessOperation({});
                        }).catch(error => {
                            console.log("================>I'm in error<================", error)
                            FailedOperation({ errorMsg: error });
                        });
                    }
                })
            } else {
                const REF_DATABASE = db.collection('users').doc(adminId);

                REF_DATABASE.update(Object.assign({
                    idNo: admin.idNo,
                    city: admin.city,
                    name: admin.name,
                    surname: admin.surname,
                    updateDate: new Date(),
                }, admin.password !== "" && { password: sha256(admin.password) })).then(() => {
                    SnackbarUtils.success('Başarıyla güncellendi!');
                    SuccessOperation({});
                }).catch(error => {
                    console.log("================>I'm in error<================", error)
                    FailedOperation({ errorMsg: error });
                });
            }
        } else {
            SnackbarUtils.error('Geçersiz kimlik numarası!');
        }
    }
}

export const deleteAdmin = (adminId, reason, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').doc(adminId);

        REF_DATABASE.update({
            status: 0,
            deleteInfo: {
                deleteDate: reason.exitDate,
                deleteReason: reason.exitReason
            }
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


//User İşlemleri
export const getUserList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').where("userType", "==", "user").where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const userList = [];
            querySnapshot.forEach(function (doc) {
                userList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ userList: userList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerUser = (user, SuccessOperation, FailedOperation) => {
    return () => {
        if (tcNoValidate(user.idNo)) {
            db.collection('users').where("idNo", "==", user.idNo).where('status', '==', 1).get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    db.collection('users').where("registerNo", '==', user.registerNo).get().then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            if (user.profilePicture !== undefined) {
                                if (user.profilePicture.size < 5242880) {
                                    const fileName = `${uuidv4()}.jpg`;
                                    const storageRef = storage.ref(`ProfilePictures/${fileName}`);
                                    storageRef.put(user.profilePicture).then((snapshot) => {
                                        snapshot.ref.getDownloadURL().then((url) => {
                                            const refDatabase = db.collection('users');
                                            console.log(url)
                                            refDatabase.add(Object.assign({
                                                registerNo: user.registerNo,
                                                registerDate: user.registerDate,
                                                userPosition: user.userPosition.id,
                                                idNo: user.idNo,
                                                name: user.name,
                                                surname: user.surname,
                                                fatherName: user.fatherName,
                                                motherName: user.motherName,
                                                placeOfBirth: user.placeOfBirth,
                                                birthday: user.birthday,
                                                birthCity: user.birthCity.il,
                                                birthCounty: user.birthCounty.ilce,
                                                birthDistrict: user.birthDistrict.id,
                                                maritalStatus: user.maritalStatus.typeName,
                                                bloodGroup: user.bloodGroup.typeName,
                                                profilePicture: url,
                                                liveCity: user.liveCity.il,
                                                liveCounty: user.liveCounty.ilce,
                                                liveDistrict: user.liveDistrict.id,
                                                liveStreet: user.liveStreet,
                                                liveBuildingNo: user.liveBuildingNo,
                                                email: user.email,
                                                education: user.education.typeName,
                                                foreignLanguage: user.foreignLanguage.id,
                                                mobilePhone: user.mobilePhone,
                                                status: 1,
                                                userType: "user",
                                            },
                                                user.businessPhone !== "" && { businessPhone: user.businessPhone },
                                                user.businessAddress !== "" && { businessAddress: user.businessAddress },
                                                user.job !== "" && { job: user.job.id },
                                                user.description !== "" && { description: user.description },
                                                user.facebook !== "" && { facebook: user.facebook },
                                                user.twitter !== "" && { twitter: user.twitter },
                                                user.instagram !== "" && { instagram: user.instagram },
                                            )).then(() => {
                                                SnackbarUtils.success('Başarıyla eklendi!');
                                                SuccessOperation({});
                                            }).catch(error => {
                                                console.log("================>I'm in error<================", error)
                                                FailedOperation({ errorMsg: error });
                                            });
                                        });
                                    });
                                } else {
                                    SnackbarUtils.error("Seçtiğiniz resim 5mb boyutundan büyük!");
                                }
                            } else {
                                SnackbarUtils.error("Öncelikle bir profil fotoğrafı seçmelisiniz!");
                            }
                        }
                        else {
                            SnackbarUtils.error('Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!');
                            FailedOperation({ errorMsg: 'Kullanıcı numarasına yeni bir kayıt alınmıştır, lütfen sayfayı yenileyiniz!' });
                        }
                    })
                } else {
                    SnackbarUtils.error('Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!');
                    FailedOperation({ errorMsg: 'Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!' });
                }
            })
        } else {
            SnackbarUtils.error('Geçersiz kimlik numarası!');
        }
    }
}

export const updateUser = (user, oldUser, userId, SuccessOperation, FailedOperation) => {
    return () => {
        if (tcNoValidate(user.idNo)) {
            if (user.idNo !== oldUser.idNo) {
                db.collection('users').where("idNo", "==", user.idNo).where('status', '==', 1).get().then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        if (user.profilePicture !== undefined) {
                            if (user.profilePicture.size < 5242880) {
                                const fileName = `${uuidv4()}.jpg`;
                                const storageRef = storage.ref(`ProfilePictures/${fileName}`);
                                storageRef.put(user.profilePicture).then((snapshot) => {
                                    snapshot.ref.getDownloadURL().then((url) => {
                                        const refDatabase = db.collection('users').doc(userId);
                                        refDatabase.update(Object.assign({
                                            registerNo: user.registerNo,
                                            registerDate: user.registerDate,
                                            userPosition: user.userPosition.id,
                                            idNo: user.idNo,
                                            name: user.name,
                                            surname: user.surname,
                                            fatherName: user.fatherName,
                                            motherName: user.motherName,
                                            placeOfBirth: user.placeOfBirth,
                                            birthday: user.birthday,
                                            birthCity: user.birthCity.il,
                                            birthCounty: user.birthCounty.ilce,
                                            birthDistrict: user.birthDistrict.id,
                                            maritalStatus: user.maritalStatus.typeName,
                                            bloodGroup: user.bloodGroup.typeName,
                                            profilePicture: url,
                                            liveCity: user.liveCity.il,
                                            liveCounty: user.liveCounty.ilce,
                                            liveDistrict: user.liveDistrict.id,
                                            liveStreet: user.liveStreet,
                                            liveBuildingNo: user.liveBuildingNo,
                                            email: user.email,
                                            education: user.education.typeName,
                                            foreignLanguage: user.foreignLanguage.id,
                                            mobilePhone: user.mobilePhone,
                                            status: 1,
                                            userType: "user",
                                        },
                                            user.businessPhone !== "" && { businessPhone: user.businessPhone },
                                            user.businessAddress !== "" && { businessAddress: user.businessAddress },
                                            user.job !== "" && { job: user.job.id },
                                            user.description !== "" && { description: user.description },
                                            user.facebook !== "" && { facebook: user.facebook },
                                            user.twitter !== "" && { twitter: user.twitter },
                                            user.instagram !== "" && { instagram: user.instagram },
                                        )).then(() => {
                                            SnackbarUtils.success('Başarıyla güncellendi!');
                                            SuccessOperation({});
                                        }
                                        ).catch(error => {
                                            console.log("================>I'm in error<================", error)
                                            FailedOperation({ errorMsg: error });
                                        }
                                        );
                                    });
                                });
                            } else {
                                SnackbarUtils.error("Seçtiğiniz resim 5mb boyutundan büyük!");
                            }
                        } else {
                            const refDatabase = db.collection('users').doc(userId);
                            refDatabase.update(Object.assign({
                                registerNo: user.registerNo,
                                registerDate: user.registerDate,
                                userPosition: user.userPosition.id,
                                idNo: user.idNo,
                                name: user.name,
                                surname: user.surname,
                                fatherName: user.fatherName,
                                motherName: user.motherName,
                                placeOfBirth: user.placeOfBirth,
                                birthday: user.birthday,
                                birthCity: user.birthCity.il,
                                birthCounty: user.birthCounty.ilce,
                                birthDistrict: user.birthDistrict.id,
                                maritalStatus: user.maritalStatus.typeName,
                                bloodGroup: user.bloodGroup.typeName,
                                liveCity: user.liveCity.il,
                                liveCounty: user.liveCounty.ilce,
                                liveDistrict: user.liveDistrict.id,
                                liveStreet: user.liveStreet,
                                liveBuildingNo: user.liveBuildingNo,
                                email: user.email,
                                education: user.education.typeName,
                                foreignLanguage: user.foreignLanguage.id,
                                mobilePhone: user.mobilePhone,
                                status: 1,
                                userType: "user",
                            },
                                user.businessPhone !== "" && { businessPhone: user.businessPhone },
                                user.businessAddress !== "" && { businessAddress: user.businessAddress },
                                user.job !== "" && { job: user.job.id },
                                user.description !== "" && { description: user.description },
                                user.facebook !== "" && { facebook: user.facebook },
                                user.twitter !== "" && { twitter: user.twitter },
                                user.instagram !== "" && { instagram: user.instagram },
                            )).then(() => {
                                SnackbarUtils.success('Başarıyla güncellendi!');
                                SuccessOperation({});
                            }
                            ).catch(error => {
                                console.log("================>I'm in error<================", error)
                                FailedOperation({ errorMsg: error });
                            });
                        }
                    } else {
                        SnackbarUtils.error('Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!');
                        FailedOperation({ errorMsg: 'Bu TC Kimlik Numarasına sahip bir kullanıcı zaten var!' });
                    }
                })
            } else {
                if (user.profilePicture !== undefined) {
                    if (user.profilePicture.size < 5242880) {
                        const fileName = `${uuidv4()}.jpg`;
                        const storageRef = storage.ref(`ProfilePictures/${fileName}`);
                        storageRef.put(user.profilePicture).then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {
                                const refDatabase = db.collection('users').doc(userId);
                                refDatabase.update(Object.assign({
                                    registerNo: user.registerNo,
                                    registerDate: user.registerDate,
                                    userPosition: user.userPosition.id,
                                    idNo: user.idNo,
                                    name: user.name,
                                    surname: user.surname,
                                    fatherName: user.fatherName,
                                    motherName: user.motherName,
                                    placeOfBirth: user.placeOfBirth,
                                    birthday: user.birthday,
                                    birthCity: user.birthCity.il,
                                    birthCounty: user.birthCounty.ilce,
                                    birthDistrict: user.birthDistrict.id,
                                    maritalStatus: user.maritalStatus.typeName,
                                    bloodGroup: user.bloodGroup.typeName,
                                    profilePicture: url,
                                    liveCity: user.liveCity.il,
                                    liveCounty: user.liveCounty.ilce,
                                    liveDistrict: user.liveDistrict.id,
                                    liveStreet: user.liveStreet,
                                    liveBuildingNo: user.liveBuildingNo,
                                    email: user.email,
                                    education: user.education.typeName,
                                    foreignLanguage: user.foreignLanguage.id,
                                    mobilePhone: user.mobilePhone,
                                    status: 1,
                                    userType: "user",
                                },
                                    user.businessPhone !== "" && { businessPhone: user.businessPhone },
                                    user.businessAddress !== "" && { businessAddress: user.businessAddress },
                                    user.job !== "" && { job: user.job.id },
                                    user.description !== "" && { description: user.description },
                                    user.facebook !== "" && { facebook: user.facebook },
                                    user.twitter !== "" && { twitter: user.twitter },
                                    user.instagram !== "" && { instagram: user.instagram },
                                )).then(() => {
                                    SnackbarUtils.success('Başarıyla güncellendi!');
                                    SuccessOperation({});
                                }
                                ).catch(error => {
                                    console.log("================>I'm in error<================", error)
                                    FailedOperation({ errorMsg: error });
                                }
                                );
                            });
                        });
                    } else {
                        SnackbarUtils.error("Seçtiğiniz resim 5mb boyutundan büyük!");
                    }
                } else {
                    const refDatabase = db.collection('users').doc(userId);
                    refDatabase.update(Object.assign({
                        registerNo: user.registerNo,
                        registerDate: user.registerDate,
                        userPosition: user.userPosition.id,
                        idNo: user.idNo,
                        name: user.name,
                        surname: user.surname,
                        fatherName: user.fatherName,
                        motherName: user.motherName,
                        placeOfBirth: user.placeOfBirth,
                        birthday: user.birthday,
                        birthCity: user.birthCity.il,
                        birthCounty: user.birthCounty.ilce,
                        birthDistrict: user.birthDistrict.id,
                        maritalStatus: user.maritalStatus.typeName,
                        bloodGroup: user.bloodGroup.typeName,
                        liveCity: user.liveCity.il,
                        liveCounty: user.liveCounty.ilce,
                        liveDistrict: user.liveDistrict.id,
                        liveStreet: user.liveStreet,
                        liveBuildingNo: user.liveBuildingNo,
                        email: user.email,
                        education: user.education.typeName,
                        foreignLanguage: user.foreignLanguage.id,
                        mobilePhone: user.mobilePhone,
                        status: 1,
                        userType: "user",
                    },
                        user.businessPhone !== "" && { businessPhone: user.businessPhone },
                        user.businessAddress !== "" && { businessAddress: user.businessAddress },
                        user.job !== "" && { job: user.job.id },
                        user.description !== "" && { description: user.description },
                        user.facebook !== "" && { facebook: user.facebook },
                        user.twitter !== "" && { twitter: user.twitter },
                        user.instagram !== "" && { instagram: user.instagram },
                    )).then(() => {
                        SnackbarUtils.success('Başarıyla güncellendi!');
                        SuccessOperation({});
                    }
                    ).catch(error => {
                        console.log("================>I'm in error<================", error)
                        FailedOperation({ errorMsg: error });
                    });
                }
            }
        } else {
            SnackbarUtils.error('Geçersiz kimlik numarası!');
        }
    }
}

export const deleteUser = (adminId, reason, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('users').doc(adminId);

        REF_DATABASE.update({
            status: 0,
            deleteInfo: {
                deleteDate: reason.exitDate,
                deleteReason: reason.exitReason
            }
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

//Firma işlemleri
export const getFirmList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('firms').where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const firmList = [];
            querySnapshot.forEach(function (doc) {
                firmList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ firmList: firmList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerFirm = (firm, SuccessOperation, FailedOperation) => {
    return () => {
        if (firm.profilePicture !== undefined) {
            if (firm.profilePicture.size < 5242880) {
                const fileName = `${uuidv4()}.jpg`;
                const storageRef = storage.ref(`FirmPhotos/${fileName}`);
                storageRef.put(firm.profilePicture).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        const refDatabase = db.collection('firms');
                        console.log(url)
                        refDatabase.add(Object.assign({
                            registerNo: firm.registerNo,
                            registerDate: firm.registerDate,
                            taxNo: firm.taxNo,
                            firmName: firm.firmName,
                            admin1: firm.admin1,
                            businessPhone: firm.businessPhone,
                            profileImage: url,
                            city: firm.city,
                            county: firm.county,
                            district: firm.district,
                            street: firm.street,
                            buildingNumber: firm.buildingNumber,
                            mobilePhone: firm.mobilePhone,
                            status: 1,
                        },
                            firm.webAddress !== "" && { webAddress: firm.webAddress },
                            firm.admin2 !== null && { admin2: firm.admin2 },
                            firm.admin3 !== null && { admin3: firm.admin3 },
                            firm.description !== "" && { description: firm.description },
                        )).then(() => {
                            SnackbarUtils.success('Başarıyla eklendi!');
                            SuccessOperation({});
                        }).catch(error => {
                            console.log("================>I'm in error<================", error)
                            FailedOperation({ errorMsg: error });
                        });
                    });
                });
            } else {
                SnackbarUtils.error("Seçtiğiniz resim 5mb boyutundan büyük!");
            }
        } else {
            SnackbarUtils.error("Öncelikle bir profil fotoğrafı seçmelisiniz!");
        }
    }
}

export const updateFirm = (firm, firmId, SuccessOperation, FailedOperation) => {
    return () => {
        if (firm.profilePicture !== undefined) {
            if (firm.profilePicture.size < 5242880) {
                const fileName = `${uuidv4()}.jpg`;
                const storageRef = storage.ref(`FirmPhotos/${fileName}`);
                storageRef.put(firm.profilePicture).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        const refDatabase = db.collection('firms').doc(firmId);
                        refDatabase.update(Object.assign({
                            registerNo: firm.registerNo,
                            registerDate: firm.registerDate,
                            taxNo: firm.taxNo,
                            firmName: firm.firmName,
                            admin1: firm.admin1,
                            businessPhone: firm.businessPhone,
                            profileImage: url,
                            city: firm.city,
                            county: firm.county,
                            district: firm.district,
                            street: firm.street,
                            buildingNumber: firm.buildingNumber,
                            mobilePhone: firm.mobilePhone,
                            status: 1,
                        },
                            firm.webAddress !== "" && { webAddress: firm.webAddress },
                            firm.admin2 !== null && { admin2: firm.admin2 },
                            firm.admin3 !== null && { admin3: firm.admin3 },
                            firm.description !== "" && { description: firm.description },
                        )).then(() => {
                            SnackbarUtils.success('Başarıyla eklendi!');
                            SuccessOperation({});
                        }).catch(error => {
                            console.log("================>I'm in error<================", error)
                            FailedOperation({ errorMsg: error });
                        });
                    });
                });
            } else {
                SnackbarUtils.error("Seçtiğiniz resim 5mb boyutundan büyük!");
            }
        } else {
            const refDatabase = db.collection('firms').doc(firmId);
            refDatabase.update(Object.assign({
                registerNo: firm.registerNo,
                registerDate: firm.registerDate,
                taxNo: firm.taxNo,
                firmName: firm.firmName,
                admin1: firm.admin1,
                businessPhone: firm.businessPhone,
                city: firm.city,
                county: firm.county,
                district: firm.district,
                street: firm.street,
                buildingNumber: firm.buildingNumber,
                mobilePhone: firm.mobilePhone,
                status: 1,
            },
                firm.webAddress !== "" && { webAddress: firm.webAddress },
                firm.admin2 !== null && { admin2: firm.admin2 },
                firm.admin3 !== null && { admin3: firm.admin3 },
                firm.description !== "" && { description: firm.description },
            )).then(() => {
                SnackbarUtils.success('Başarıyla eklendi!');
                SuccessOperation({});
            }).catch(error => {
                console.log("================>I'm in error<================", error)
                FailedOperation({ errorMsg: error });
            });
        }
    }
}

export const deleteFirm = (firmId, reason, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('firms').doc(firmId);

        REF_DATABASE.update({
            status: 0,
            deleteInfo: {
                deleteDate: reason.exitDate,
                deleteReason: reason.exitReason
            }
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

//get parameters
export const getUserTypeList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('userTypes').where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const userTypes = [];
            querySnapshot.forEach(function (doc) {
                userTypes.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ userTypes: userTypes });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const getDistrictList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('districts').where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const districtList = [];
            querySnapshot.forEach(function (doc) {
                districtList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ districtList: districtList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const getJobList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('jobs').where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const jobList = [];
            querySnapshot.forEach(function (doc) {
                jobList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ jobList: jobList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const getActivityKindList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('activityKinds').where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const activityKindList = [];
            querySnapshot.forEach(function (doc) {
                activityKindList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ activityKindList: activityKindList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const getForeignLanguageList = (SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('foreignLanguages').where('status', '==', 1).orderBy("registerDate", 'desc');

        REF_DATABASE.get().then(function (querySnapshot) {
            const foreignLanguageList = [];
            querySnapshot.forEach(function (doc) {
                foreignLanguageList.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            SuccessOperation({ foreignLanguageList: foreignLanguageList });
        }).catch(function (error) {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

//reigster parameters
export const registerUserType = (userType, SuccessOperation, FailedOperation) => {
    return () => {
        db.collection('userTypes').where("registerNo", '==', userType.registerNo).get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                const REF_DATABASE = db.collection('userTypes');

                REF_DATABASE.add({
                    typeName: userType.typeName,
                    registerNo: userType.registerNo,
                    registerDate: new Date(),
                    status: 1,
                }).then(() => {
                    SnackbarUtils.success('Başarıyla kayıt edildi!');
                    SuccessOperation({});
                }).catch(error => {
                    console.log("================>I'm in error<================", error)
                    FailedOperation({ errorMsg: error });
                });
            } else {
                SnackbarUtils.error('Bu kayıt numarasına yeni kayıt alındı lütfen sayfayı yenileyin!');
                FailedOperation({ errorMsg: 'Bu kayıt numarası kullanılıyor!' });
            }
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerDistrict = (district, SuccessOperation, FailedOperation) => {
    return () => {
        db.collection('districts').where("registerNo", '==', district.registerNo).get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                const REF_DATABASE = db.collection('districts');

                REF_DATABASE.add({
                    typeName: district.typeName,
                    registerNo: district.registerNo,
                    registerDate: new Date(),
                    city: district.city.il,
                    county: district.county.ilce,
                    status: 1,
                }).then(() => {
                    SnackbarUtils.success('Başarıyla kayıt edildi!');
                    SuccessOperation({});
                }).catch(error => {
                    console.log("================>I'm in error<================", error)
                    FailedOperation({ errorMsg: error });
                });
            } else {
                SnackbarUtils.error('Bu kayıt numarasına yeni kayıt alındı lütfen sayfayı yenileyin!');
                FailedOperation({ errorMsg: 'Bu kayıt numarası kullanılıyor!' });
            }
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerJob = (job, SuccessOperation, FailedOperation) => {
    return () => {
        db.collection('jobs').where("registerNo", '==', job.registerNo).get().then((querySnapshot) => {
            if (querySnapshot.empty) {

                const REF_DATABASE = db.collection('jobs');

                REF_DATABASE.add({
                    typeName: job.typeName,
                    registerNo: job.registerNo,
                    registerDate: new Date(),
                    status: 1,
                }).then(() => {
                    SnackbarUtils.success('Başarıyla kayıt edildi!');
                    SuccessOperation({});
                }).catch(error => {
                    console.log("================>I'm in error<================", error)
                    FailedOperation({ errorMsg: error });
                });
            } else {
                SnackbarUtils.error('Bu kayıt numarasına yeni kayıt alındı lütfen sayfayı yenileyin!');
                FailedOperation({ errorMsg: 'Bu kayıt numarası kullanılıyor!' });
            }
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerActivityKind = (activityKind, SuccessOperation, FailedOperation) => {
    return () => {
        db.collection('activityKinds').where("registerNo", '==', activityKind.registerNo).get().then((querySnapshot) => {
            if (querySnapshot.empty) {

                const REF_DATABASE = db.collection('activityKinds');

                REF_DATABASE.add({
                    typeName: activityKind.typeName,
                    registerNo: activityKind.registerNo,
                    registerDate: new Date(),
                    status: 1,
                }).then(() => {
                    SnackbarUtils.success('Başarıyla kayıt edildi!');
                    SuccessOperation({});
                }).catch(error => {
                    console.log("================>I'm in error<================", error)
                    FailedOperation({ errorMsg: error });
                });
            } else {
                SnackbarUtils.error('Bu kayıt numarasına yeni kayıt alındı lütfen sayfayı yenileyin!');
                FailedOperation({ errorMsg: 'Bu kayıt numarası kullanılıyor!' });
            }
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

export const registerForeignLanguage = (foreignLanguage, SuccessOperation, FailedOperation) => {
    return () => {
        db.collection('foreignLanguages').where("registerNo", '==', foreignLanguage.registerNo).get().then((querySnapshot) => {
            if (querySnapshot.empty) {

                const REF_DATABASE = db.collection('foreignLanguages');

                REF_DATABASE.add({
                    typeName: foreignLanguage.typeName,
                    registerNo: foreignLanguage.registerNo,
                    registerDate: new Date(),
                    status: 1,
                }).then(() => {
                    SnackbarUtils.success('Başarıyla kayıt edildi!');
                    SuccessOperation({});
                }).catch(error => {
                    console.log("================>I'm in error<================", error)
                    FailedOperation({ errorMsg: error });
                });
            } else {
                SnackbarUtils.error('Bu kayıt numarasına yeni kayıt alındı lütfen sayfayı yenileyin!');
                FailedOperation({ errorMsg: 'Bu kayıt numarası kullanılıyor!' });
            }
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

//update parameters
export const updateUserType = (userType, updateUserTypeId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('userTypes').doc(updateUserTypeId);

        REF_DATABASE.update({
            typeName: userType.typeName,
            registerNo: userType.registerNo,
        }).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const updateDistrict = (district, updateDistrictId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('districts').doc(updateDistrictId);

        REF_DATABASE.update({
            typeName: district.typeName,
            //city: district.city,
            //county: district.county,
        }).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const updateJob = (job, updateJobId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('jobs').doc(updateJobId);

        REF_DATABASE.update({
            typeName: job.typeName,
        }).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const updateActivityKind = (activityKind, updateActivityKindId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('activityKinds').doc(updateActivityKindId);

        REF_DATABASE.update({
            typeName: activityKind.typeName,
            registerNo: activityKind.registerNo,
        }).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const updateForeignLanguage = (foreignLanguage, updateForeignLanguageId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('foreignLanguages').doc(updateForeignLanguageId);

        REF_DATABASE.update({
            typeName: foreignLanguage.typeName,
            registerNo: foreignLanguage.registerNo,
        }).then(() => {
            SnackbarUtils.success('Başarıyla güncellendi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}

//delete parameters
export const deleteUserType = (deleteUserTypeId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('userTypes').doc(deleteUserTypeId);

        REF_DATABASE.update({
            status: 0,
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const deleteDistrict = (deleteDistrictId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('districts').doc(deleteDistrictId);

        REF_DATABASE.update({
            status: 0,
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const deleteJob = (deleteJobId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('jobs').doc(deleteJobId);

        REF_DATABASE.update({
            status: 0,
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const deleteActivityKind = (deleteActivityKindId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('activityKinds').doc(deleteActivityKindId);

        REF_DATABASE.update({
            status: 0,
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}


export const deleteForeignLanguage = (deleteForeignLanguageId, SuccessOperation, FailedOperation) => {
    return () => {
        const REF_DATABASE = db.collection('foreignLanguages').doc(deleteForeignLanguageId);

        REF_DATABASE.update({
            status: 0,
        }).then(() => {
            SnackbarUtils.success('Başarıyla silindi!');
            SuccessOperation({});
        }).catch(error => {
            console.log("================>I'm in error<================", error)
            FailedOperation({ errorMsg: error });
        });
    }
}