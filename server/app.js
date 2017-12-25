/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "57ead21b270b650a83ec"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),

/***/ "./src/board.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);


var j5 = __webpack_require__("johnny-five");
var EtherPort = __webpack_require__("etherport");

var _require = __webpack_require__("./src/constants.js"),
    BOARD_STATUS = _require.BOARD_STATUS,
    ERROR_MESSAGE = _require.ERROR_MESSAGE,
    ETHERPORT_PORT = _require.ETHERPORT_PORT,
    MOTOR_PINS = _require.MOTOR_PINS,
    EXCEPTIONS = _require.EXCEPTIONS,
    DISABLE_BOARD = _require.DISABLE_BOARD;

function Board() {
  var _this = this;

  console.log('Board suffesfully connected!');
  this.status = BOARD_STATUS.CONNECTING;
  this.isMoving = false;
  this.moveMotor = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            throw new Error(ERROR_MESSAGE.NOT_CONNECTED);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  var board = new j5.Board({
    port: new EtherPort(ETHERPORT_PORT),
    timeout: 1e5,
    repl: false
  });

  board.on('ready', function () {
    _this.status = BOARD_STATUS.SUCCESSFUL;

    var stepper = new j5.Stepper({
      type: j5.Stepper.TYPE.FOUR_WIRE,
      stepsPerRev: 96,
      pins: MOTOR_PINS
    });

    moveMotor = function moveMotor(steps) {
      return new Promise(function (resolve) {
        return stepper.rpm(300).direction(steps > 0 ? j5.Stepper.DIRECTION.CCW : j5.Stepper.DIRECTION.CW).step(Math.abs(steps), resolve);
      });
    };

    _this.moveMotor = function () {
      var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(steps) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this.isMoving === true)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error(ERROR_MESSAGE.ROLLER_BLINDS_MOVING);

              case 2:
                _this.isMoving = true;
                _context2.next = 5;
                return moveMotor(steps);

              case 5:
                _this.isMoving = false;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  });

  board.on('error', function (error) {
    _this.status = BOARD_STATUS.ERROR;
    console.error(ERROR_MESSAGE.CONNECTING_BOARD_ERROR);
  });
}

function BoardDisable() {
  var _this2 = this;

  console.log('BOARD SUCCESSFULLY DISABLED!');
  this.status = BOARD_STATUS;
  this.isMoving = false;

  var moveMotor = function moveMotor(steps) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, Math.abs(steps));
    });
  };

  this.moveMotor = function () {
    var _ref3 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3(steps) {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(_this2.isMoving === true)) {
                _context3.next = 2;
                break;
              }

              throw new Error(ERROR_MESSAGE.ROLLER_BLINDS_MOVING);

            case 2:
              _this2.isMoving = true;
              _context3.next = 5;
              return moveMotor(steps);

            case 5:
              _this2.isMoving = false;

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
}

/* harmony default export */ __webpack_exports__["a"] = (DISABLE_BOARD ? BoardDisable : Board);

/***/ }),

/***/ "./src/constants.js":
/***/ (function(module, exports, __webpack_require__) {

var BOARD_STATUS = {
  CONNECTING: 'CONNECTING',
  SUCCESSFUL: 'SUCCESSFUL',
  ERROR: 'ERROR'
};

var ERROR_MESSAGE = {
  NOT_CONNECTED: 'Your roller blinds are not connected yet.',
  CONNECTING_BOARD_ERROR: "Can't connect to your roller blinds, please check the configuration",
  ROLLER_BLINDS_MOVING: 'Your roller blinds are moving right now.',
  DATABASE_GET_ERROR: "Can't get your roller blinds position from database",
  DATABASE_INSERT_ERROR: "Can't save your roller blinds position into database",
  UNHANDLED_ERROR: 'Something weird happenned',
  UNRECOGNIZED_ACTION: 'Socket has received an invalid action, nothing was done ...'
};

var ACTIONS = {
  SET_POSITION_REQUEST: 'server/SET_POSITION',
  SET_POSITION: 'SET_POSITION',
  SERVER_ERROR: 'SERVER_ERROR',
  SOCKET_CONNECTED: 'SOCKET_CONNECTED'
};

var DEFAULT_ENV = {
  PORT: 8000,
  MOTOR_PINS: [14, 12, 13, 15],
  ETHERPORT_PORT: 3030,
  DEBUG: true,
  DISABLE_BOARD: false
};

var SERVER_PORT = process.env.PORT || DEFAULT_ENV.PORT;

var MOTOR_PINS = process.env.MOTOR_PIN || DEFAULT_ENV.MOTOR_PINS;

var ETHERPORT_PORT = process.env.ETHERPORT_PORT || DEFAULT_ENV.ETHERPORT_PORT;

var DEBUG = process.env.DEBUG || DEFAULT_ENV.DEBUG;

var DISABLE_BOARD = "true" || DEFAULT_ENV.DISABLE_BOARD;

module.exports = {
  BOARD_STATUS: BOARD_STATUS,
  ERROR_MESSAGE: ERROR_MESSAGE,
  ACTIONS: ACTIONS,
  SERVER_PORT: SERVER_PORT,
  MOTOR_PINS: MOTOR_PINS,
  ETHERPORT_PORT: ETHERPORT_PORT,
  DEBUG: DEBUG,
  DISABLE_BOARD: DISABLE_BOARD
};

/***/ }),

/***/ "./src/controller.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rollerBlind__ = __webpack_require__("./src/rollerBlind.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express__);



var _this = this;




var router = Object(__WEBPACK_IMPORTED_MODULE_3_express__["Router"])();

router.route('/position').get(function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(req, res) {
    var position;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return __WEBPACK_IMPORTED_MODULE_2__rollerBlind__["default"].getPosition();

          case 3:
            position = _context.sent;
            return _context.abrupt('return', res.json({ position: position }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            res.statusMessage = _context.t0;
            return _context.abrupt('return', res.sendStatus(400).end());

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).put(function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(req, res) {
    var pos;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return __WEBPACK_IMPORTED_MODULE_2__rollerBlind__["default"].setPosition(req.position);

          case 3:
            pos = _context2.sent;
            return _context2.abrupt('return', res.sendStatus(200));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            res.statusMessage = _context2.t0;
            return _context2.abrupt('return', res.sendStatus(400).end());

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.get('/', function (req, res) {
  return res.sendFile(__dirname + '/src/index.html');
});

router.get('/status', function (req, res) {
  var status = __WEBPACK_IMPORTED_MODULE_2__rollerBlind__["default"].getStatus();
  return res.json({ status: status });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http__ = __webpack_require__("http");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket__ = __webpack_require__("./src/socket.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("./src/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controller__ = __webpack_require__("./src/controller.js");






var app = __WEBPACK_IMPORTED_MODULE_3_express___default()().use(__WEBPACK_IMPORTED_MODULE_4__controller__["a" /* default */]);
var server = __WEBPACK_IMPORTED_MODULE_0_http___default.a.createServer(app);

var currentApp = app;
var currentAppSocket = Object(__WEBPACK_IMPORTED_MODULE_1__socket__["a" /* default */])(server);

server.listen(__WEBPACK_IMPORTED_MODULE_2__constants__["SERVER_PORT"], function () {
  console.log('Listening on port ' + __WEBPACK_IMPORTED_MODULE_2__constants__["SERVER_PORT"] + '... http://localhost:' + __WEBPACK_IMPORTED_MODULE_2__constants__["SERVER_PORT"]);
});

if (true) {
  module.hot.accept("./src/app.js", function () {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}

/***/ }),

/***/ "./src/rollerBlind.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board__ = __webpack_require__("./src/board.js");



var _this = this;

var storage = __webpack_require__("./src/storage.js");


var _require = __webpack_require__("./src/utils.js"),
    calculateSteps = _require.calculateSteps,
    noop = _require.noop;

var board = new __WEBPACK_IMPORTED_MODULE_2__board__["a" /* default */]();

var getPosition = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return storage.getPosition();

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getPosition() {
    return _ref.apply(this, arguments);
  };
}();

var setPosition = function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(newPosition) {
    var position, steps;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return storage.getPosition();

          case 2:
            position = _context2.sent;
            steps = calculateSteps(newPosition, position);
            _context2.next = 6;
            return board.moveMotor(steps);

          case 6:
            _context2.next = 8;
            return storage.setPosition(newPosition);

          case 8:
            return _context2.abrupt('return', newPosition);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function setPosition(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getStatus = function getStatus() {
  return board.status;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  getPosition: getPosition,
  setPosition: setPosition,
  getStatus: getStatus
});

/***/ }),

/***/ "./src/socket.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io__ = __webpack_require__("socket.io");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io__);



var _this = this;


var rollerBlind = __webpack_require__("./src/rollerBlind.js");

var _require = __webpack_require__("./src/constants.js"),
    ACTIONS = _require.ACTIONS,
    ERROR_MESSAGE = _require.ERROR_MESSAGE,
    DEBUG = _require.DEBUG;

var initSocket = function initSocket(server) {
  var io = __WEBPACK_IMPORTED_MODULE_2_socket_io___default()(server, {
    serveClient: false,
    wsEngine: 'ws' // uws is not supported since it is a native module
  });

  var connectedSockets = [];

  io.on('connection', function () {
    var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(socket) {
      var position;
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              connectedSockets.push(socket.id);
              console.log('new socket connection', connectedSockets);

              socket.on('disconnect', function () {
                connectedSockets = connectedSockets.filter(function (x) {
                  return x !== socket.id;
                });
                console.log('disconnected socket', connectedSockets);
              });

              socket.emit('action', { type: ACTIONS.SOCKET_CONNECTED });
              _context2.prev = 4;
              _context2.next = 7;
              return rollerBlind.getPosition();

            case 7:
              position = _context2.sent;

              socket.emit('action', { type: ACTIONS.SET_POSITION, position: position });
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2['catch'](4);

              socket.emit('action', {
                type: ACTIONS.SERVER_ERROR,
                error: _context2.t0.message
              });

            case 14:

              socket.on('action', function () {
                var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(action) {
                  var newPosition;
                  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (DEBUG) console.log('New action received', action.type);

                          _context.t0 = action.type;
                          _context.next = _context.t0 === ACTIONS.SET_POSITION_REQUEST ? 4 : 15;
                          break;

                        case 4:
                          _context.prev = 4;
                          _context.next = 7;
                          return rollerBlind.setPosition(action.position);

                        case 7:
                          newPosition = _context.sent;

                          io.emit('action', {
                            type: ACTIONS.SET_POSITION,
                            position: newPosition
                          });
                          _context.next = 14;
                          break;

                        case 11:
                          _context.prev = 11;
                          _context.t1 = _context['catch'](4);

                          socket.emit('action', {
                            type: ACTIONS.SERVER_ERROR,
                            error: _context.t1.message
                          });

                        case 14:
                          return _context.abrupt('break', 17);

                        case 15:
                          socket.emit('action', {
                            type: ACTIONS.SERVER_ERROR,
                            error: ERROR_MESSAGE.UNRECOGNIZED_ACTION
                          });
                          return _context.abrupt('break', 17);

                        case 17:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this, [[4, 11]]);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[4, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ __webpack_exports__["a"] = (initSocket);

/***/ }),

/***/ "./src/storage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__("./src/utils.js");



var _this = this;

var datastore = __webpack_require__("nedb-promise");


var _require = __webpack_require__("./src/constants.js"),
    ERROR_MESSAGE = _require.ERROR_MESSAGE,
    DEBUG = _require.DEBUG;

var db = datastore({ filename: './src/database.db', autoload: true });

var getPosition = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    var document;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.cfind({}).sort({ dateTime: -1 }).limit(1).exec();

          case 3:
            document = _context.sent;
            return _context.abrupt('return', document[0].position);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw new Error(ERROR_MESSAGE.DATABASE_GET_ERROR);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[0, 7]]);
  }));

  return function getPosition() {
    return _ref.apply(this, arguments);
  };
}();

var setPosition = function () {
  var _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(position) {
    var newPositionRecord;
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newPositionRecord = { position: position, dateTime: Date.now() };
            _context2.next = 4;
            return db.insert(newPositionRecord);

          case 4:
            return _context2.abrupt('return', position);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);
            throw new Error(ERROR_MESSAGE.DATABASE_INSERT_ERROR);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[0, 7]]);
  }));

  return function setPosition(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// export default {
//   getPosition: withDebugHOF(getPosition),
//   setPosition: withDebugHOF(setPosition),
// };

/* harmony default export */ __webpack_exports__["default"] = ({
  getPosition: getPosition,
  setPosition: setPosition
});

/***/ }),

/***/ "./src/utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/constants.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);


var STEPPER_MOTOR_STEPS_ONE_LAP = 4096;
var TOTAL_STEPS_FULL_BLINDS = STEPPER_MOTOR_STEPS_ONE_LAP * 8;

var MIN_POSITION = 0;
var MAX_POSITION = 100;

var positionToSteps = function positionToSteps(position) {
  return position * TOTAL_STEPS_FULL_BLINDS / MAX_POSITION;
};

var calculateSteps = function calculateSteps(newPosition, currentPosition) {
  return positionToSteps(newPosition) - positionToSteps(currentPosition);
};

var functionCallLoggerHOF = function functionCallLoggerHOF(func) {
  return function (params) {
    var functionCall = 'function called: ' + func.name;
    var paramsDescription = params ? ', with params: ' + params : '';
    console.log('FUNCTION_LOGGER: ' + functionCall + paramsDescription);

    return func(params);
  };
};

var noop = function noop() {};

var withDebugHOF = function withDebugHOF(func) {
  return __WEBPACK_IMPORTED_MODULE_0__constants__["DEBUG"] ? functionCallLoggerHOF(func) : func;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  calculateSteps: calculateSteps,
  withDebugHOF: withDebugHOF,
  noop: noop
});

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/webpack/hot/poll.js?1000");
module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "etherport":
/***/ (function(module, exports) {

module.exports = require("etherport");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "johnny-five":
/***/ (function(module, exports) {

module.exports = require("johnny-five");

/***/ }),

/***/ "nedb-promise":
/***/ (function(module, exports) {

module.exports = require("nedb-promise");

/***/ }),

/***/ "socket.io":
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTdlYWQyMWIyNzBiNjUwYTgzZWMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvbG9nLWFwcGx5LXJlc3VsdC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2hvdC9sb2cuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3QvcG9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JvbGxlckJsaW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV0aGVycG9ydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiam9obm55LWZpdmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZWRiLXByb21pc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIiJdLCJuYW1lcyI6WyJqNSIsInJlcXVpcmUiLCJFdGhlclBvcnQiLCJCT0FSRF9TVEFUVVMiLCJFUlJPUl9NRVNTQUdFIiwiRVRIRVJQT1JUX1BPUlQiLCJNT1RPUl9QSU5TIiwiRVhDRVBUSU9OUyIsIkRJU0FCTEVfQk9BUkQiLCJCb2FyZCIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJDT05ORUNUSU5HIiwiaXNNb3ZpbmciLCJtb3ZlTW90b3IiLCJFcnJvciIsIk5PVF9DT05ORUNURUQiLCJib2FyZCIsInBvcnQiLCJ0aW1lb3V0IiwicmVwbCIsIm9uIiwiU1VDQ0VTU0ZVTCIsInN0ZXBwZXIiLCJTdGVwcGVyIiwidHlwZSIsIlRZUEUiLCJGT1VSX1dJUkUiLCJzdGVwc1BlclJldiIsInBpbnMiLCJQcm9taXNlIiwicnBtIiwiZGlyZWN0aW9uIiwic3RlcHMiLCJESVJFQ1RJT04iLCJDQ1ciLCJDVyIsInN0ZXAiLCJNYXRoIiwiYWJzIiwicmVzb2x2ZSIsIlJPTExFUl9CTElORFNfTU9WSU5HIiwiRVJST1IiLCJlcnJvciIsIkNPTk5FQ1RJTkdfQk9BUkRfRVJST1IiLCJCb2FyZERpc2FibGUiLCJzZXRUaW1lb3V0IiwiREFUQUJBU0VfR0VUX0VSUk9SIiwiREFUQUJBU0VfSU5TRVJUX0VSUk9SIiwiVU5IQU5ETEVEX0VSUk9SIiwiVU5SRUNPR05JWkVEX0FDVElPTiIsIkFDVElPTlMiLCJTRVRfUE9TSVRJT05fUkVRVUVTVCIsIlNFVF9QT1NJVElPTiIsIlNFUlZFUl9FUlJPUiIsIlNPQ0tFVF9DT05ORUNURUQiLCJERUZBVUxUX0VOViIsIlBPUlQiLCJERUJVRyIsIlNFUlZFUl9QT1JUIiwicHJvY2VzcyIsImVudiIsIk1PVE9SX1BJTiIsIm1vZHVsZSIsImV4cG9ydHMiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJyb3V0ZSIsImdldCIsInJlcSIsInJlcyIsInJvbGxlckJsaW5kIiwiZ2V0UG9zaXRpb24iLCJwb3NpdGlvbiIsImpzb24iLCJzdGF0dXNNZXNzYWdlIiwic2VuZFN0YXR1cyIsImVuZCIsInB1dCIsInNldFBvc2l0aW9uIiwicG9zIiwic2VuZEZpbGUiLCJfX2Rpcm5hbWUiLCJnZXRTdGF0dXMiLCJhcHAiLCJleHByZXNzIiwidXNlIiwic2VydmVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsImN1cnJlbnRBcHAiLCJjdXJyZW50QXBwU29ja2V0IiwiaW5pdFNvY2tldCIsImxpc3RlbiIsImhvdCIsImFjY2VwdCIsInJlbW92ZUxpc3RlbmVyIiwic3RvcmFnZSIsImNhbGN1bGF0ZVN0ZXBzIiwibm9vcCIsIm5ld1Bvc2l0aW9uIiwiaW8iLCJzb2NrZXRJbyIsInNlcnZlQ2xpZW50Iiwid3NFbmdpbmUiLCJjb25uZWN0ZWRTb2NrZXRzIiwic29ja2V0IiwicHVzaCIsImlkIiwiZmlsdGVyIiwieCIsImVtaXQiLCJtZXNzYWdlIiwiYWN0aW9uIiwiZGF0YXN0b3JlIiwiZGIiLCJmaWxlbmFtZSIsImF1dG9sb2FkIiwiY2ZpbmQiLCJzb3J0IiwiZGF0ZVRpbWUiLCJsaW1pdCIsImV4ZWMiLCJkb2N1bWVudCIsIm5ld1Bvc2l0aW9uUmVjb3JkIiwiRGF0ZSIsIm5vdyIsImluc2VydCIsIlNURVBQRVJfTU9UT1JfU1RFUFNfT05FX0xBUCIsIlRPVEFMX1NURVBTX0ZVTExfQkxJTkRTIiwiTUlOX1BPU0lUSU9OIiwiTUFYX1BPU0lUSU9OIiwicG9zaXRpb25Ub1N0ZXBzIiwiY3VycmVudFBvc2l0aW9uIiwiZnVuY3Rpb25DYWxsTG9nZ2VySE9GIiwiZnVuY3Rpb25DYWxsIiwiZnVuYyIsIm5hbWUiLCJwYXJhbXNEZXNjcmlwdGlvbiIsInBhcmFtcyIsIndpdGhEZWJ1Z0hPRiJdLCJtYXBwaW5ncyI6IjtBQUFBLG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7O0FBRUEsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkNBQXFDO0FBQ3JDO0FBQ0E7Ozs7QUFJQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDLCtDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBc0M7QUFDdEM7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUEsNERBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQWEsNEJBQTRCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsdUNBQXVDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsdUNBQXVDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0EsUUFBTUMsb0JBQW9CQyw2QkFBMkJBLE1BQTNCLEdBQXNDLEVBQWhFO0FBQ0FsSSxZQUFRQyxHQUFSLHVCQUFnQzZILFlBQWhDLEdBQStDRyxpQkFBL0M7O0FBRUEsV0FBT0YsS0FBS0csTUFBTCxDQUFQO0FBQ0QsR0FONkI7QUFBQSxDQUE5Qjs7QUFRQSxJQUFNeEMsT0FBTyxTQUFQQSxJQUFPLEdBQU0sQ0FBRSxDQUFyQjs7QUFFQSxJQUFNeUMsZUFBZSxTQUFmQSxZQUFlO0FBQUEsU0FBUyxpREFBQWxGLEdBQVE0RSxzQkFBc0JFLElBQXRCLENBQVIsR0FBc0NBLElBQS9DO0FBQUEsQ0FBckI7O0FBRUEsK0RBQWU7QUFDYnRDLGdDQURhO0FBRWIwQyw0QkFGYTtBQUdiekM7QUFIYSxDQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQkEsbUU7Ozs7Ozs7QUNBQSxzRDs7Ozs7OztBQ0FBLHNDOzs7Ozs7O0FDQUEsb0M7Ozs7Ozs7QUNBQSxpQzs7Ozs7OztBQ0FBLHdDOzs7Ozs7O0FDQUEseUM7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiKTtcclxuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVuay5pZCwgY2h1bmsubW9kdWxlcyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR0cnkge1xyXG4gXHRcdFx0dmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xyXG4gXHRcdH0gY2F0Y2goZSkge1xyXG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gXHRcdH1cclxuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZSk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7IC8vZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XHJcbiBcdH1cclxuXG4gXHRcclxuIFx0XHJcbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcclxuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI1N2VhZDIxYjI3MGI2NTBhODNlY1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVxdWVzdCArIFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xyXG4gXHRcdH07XHJcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcclxuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xyXG4gXHRcdFx0XHR0aHJvdyBlcnI7XHJcbiBcdFx0XHR9KTtcclxuIFx0XHJcbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XHJcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcclxuIFx0XHRyZXR1cm4gaG90O1xyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcclxuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xyXG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xyXG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90RGVmZXJyZWQ7XHJcbiBcdFxyXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cclxuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcclxuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xyXG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcclxuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcclxuIFx0XHRcdGlmKCF1cGRhdGUpIHtcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xyXG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xyXG4gXHRcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcclxuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxyXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xyXG4gXHRcdFx0dmFyIGNodW5rSWQgPSAwO1xyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xyXG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcclxuIFx0XHRpZighZGVmZXJyZWQpIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xyXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXHJcbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XHJcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XHJcbiBcdFx0XHR9KS50aGVuKFxyXG4gXHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHQpO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgY2I7XHJcbiBcdFx0dmFyIGk7XHJcbiBcdFx0dmFyIGo7XHJcbiBcdFx0dmFyIG1vZHVsZTtcclxuIFx0XHR2YXIgbW9kdWxlSWQ7XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFxyXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XHJcbiBcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXHJcbiBcdFx0XHRcdFx0aWQ6IGlkXHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XHJcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX21haW4pIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZighcGFyZW50KSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxyXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcclxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xyXG4gXHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiKTtcclxuIFx0XHR9O1xyXG4gXHRcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQ7XHJcbiBcdFx0XHRcdGlmKGhvdFVwZGF0ZVtpZF0pIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XHJcbiBcdFx0XHRcdGlmKHJlc3VsdC5jaGFpbikge1xyXG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRzd2l0Y2gocmVzdWx0LnR5cGUpIHtcclxuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIiBpbiBcIiArIHJlc3VsdC5wYXJlbnRJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vblVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25BY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRpc3Bvc2VkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRkZWZhdWx0OlxyXG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihhYm9ydEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGRvQXBwbHkpIHtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHRcdFx0XHRmb3IobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcclxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9EaXNwb3NlKSB7XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcclxuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH0pO1xyXG4gXHRcclxuIFx0XHR2YXIgaWR4O1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4gXHRcdFx0XHRjYihkYXRhKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcclxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXHJcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xyXG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYobW9kdWxlKSB7XHJcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdFx0aWYoY2IpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XHJcbiBcdFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcihpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyMikge1xyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yZ2luYWxFcnJvcjogZXJyLCAvLyBUT0RPIHJlbW92ZSBpbiB3ZWJwYWNrIDRcclxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjI7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU3ZWFkMjFiMjcwYjY1MGE4M2VjIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcclxuXHR2YXIgdW5hY2NlcHRlZE1vZHVsZXMgPSB1cGRhdGVkTW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24obW9kdWxlSWQpIHtcclxuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XHJcblx0fSk7XHJcblx0dmFyIGxvZyA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcclxuXHJcblx0aWYodW5hY2NlcHRlZE1vZHVsZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIik7XHJcblx0XHR1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XHJcblx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0aWYoIXJlbmV3ZWRNb2R1bGVzIHx8IHJlbmV3ZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIE5vdGhpbmcgaG90IHVwZGF0ZWQuXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gVXBkYXRlZCBtb2R1bGVzOlwiKTtcclxuXHRcdHJlbmV3ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24obW9kdWxlSWQpIHtcclxuXHRcdFx0aWYodHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiICYmIG1vZHVsZUlkLmluZGV4T2YoXCIhXCIpICE9PSAtMSkge1xyXG5cdFx0XHRcdHZhciBwYXJ0cyA9IG1vZHVsZUlkLnNwbGl0KFwiIVwiKTtcclxuXHRcdFx0XHRsb2cuZ3JvdXBDb2xsYXBzZWQoXCJpbmZvXCIsIFwiW0hNUl0gIC0gXCIgKyBwYXJ0cy5wb3AoKSk7XHJcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xyXG5cdFx0XHRcdGxvZy5ncm91cEVuZChcImluZm9cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHZhciBudW1iZXJJZHMgPSByZW5ld2VkTW9kdWxlcy5ldmVyeShmdW5jdGlvbihtb2R1bGVJZCkge1xyXG5cdFx0XHRyZXR1cm4gdHlwZW9mIG1vZHVsZUlkID09PSBcIm51bWJlclwiO1xyXG5cdFx0fSk7XHJcblx0XHRpZihudW1iZXJJZHMpXHJcblx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBDb25zaWRlciB1c2luZyB0aGUgTmFtZWRNb2R1bGVzUGx1Z2luIGZvciBtb2R1bGUgbmFtZXMuXCIpO1xyXG5cdH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2hvdC9sb2ctYXBwbHktcmVzdWx0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2ctYXBwbHktcmVzdWx0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xyXG5cclxuZnVuY3Rpb24gZHVtbXkoKSB7fVxyXG5cclxuZnVuY3Rpb24gc2hvdWxkTG9nKGxldmVsKSB7XHJcblx0dmFyIHNob3VsZExvZyA9IChsb2dMZXZlbCA9PT0gXCJpbmZvXCIgJiYgbGV2ZWwgPT09IFwiaW5mb1wiKSB8fFxyXG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxyXG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCIsIFwiZXJyb3JcIl0uaW5kZXhPZihsb2dMZXZlbCkgPj0gMCAmJiBsZXZlbCA9PT0gXCJlcnJvclwiKTtcclxuXHRyZXR1cm4gc2hvdWxkTG9nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2dHcm91cChsb2dGbikge1xyXG5cdHJldHVybiBmdW5jdGlvbihsZXZlbCwgbXNnKSB7XHJcblx0XHRpZihzaG91bGRMb2cobGV2ZWwpKSB7XHJcblx0XHRcdGxvZ0ZuKG1zZyk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsZXZlbCwgbXNnKSB7XHJcblx0aWYoc2hvdWxkTG9nKGxldmVsKSkge1xyXG5cdFx0aWYobGV2ZWwgPT09IFwiaW5mb1wiKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKG1zZyk7XHJcblx0XHR9IGVsc2UgaWYobGV2ZWwgPT09IFwid2FybmluZ1wiKSB7XHJcblx0XHRcdGNvbnNvbGUud2Fybihtc2cpO1xyXG5cdFx0fSBlbHNlIGlmKGxldmVsID09PSBcImVycm9yXCIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihtc2cpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbnZhciBncm91cCA9IGNvbnNvbGUuZ3JvdXAgfHwgZHVtbXk7XHJcbnZhciBncm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgfHwgZHVtbXk7XHJcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5ncm91cCA9IGxvZ0dyb3VwKGdyb3VwKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmdyb3VwQ29sbGFwc2VkID0gbG9nR3JvdXAoZ3JvdXBDb2xsYXBzZWQpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5zZXRMb2dMZXZlbCA9IGZ1bmN0aW9uKGxldmVsKSB7XHJcblx0bG9nTGV2ZWwgPSBsZXZlbDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2hvdC9sb2cuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2xvZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vKmdsb2JhbHMgX19yZXNvdXJjZVF1ZXJ5ICovXHJcbmlmKG1vZHVsZS5ob3QpIHtcclxuXHR2YXIgaG90UG9sbEludGVydmFsID0gKyhfX3Jlc291cmNlUXVlcnkuc3Vic3RyKDEpKSB8fCAoMTAgKiA2MCAqIDEwMDApO1xyXG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XHJcblxyXG5cdHZhciBjaGVja0ZvclVwZGF0ZSA9IGZ1bmN0aW9uIGNoZWNrRm9yVXBkYXRlKGZyb21VcGRhdGUpIHtcclxuXHRcdGlmKG1vZHVsZS5ob3Quc3RhdHVzKCkgPT09IFwiaWRsZVwiKSB7XHJcblx0XHRcdG1vZHVsZS5ob3QuY2hlY2sodHJ1ZSkudGhlbihmdW5jdGlvbih1cGRhdGVkTW9kdWxlcykge1xyXG5cdFx0XHRcdGlmKCF1cGRhdGVkTW9kdWxlcykge1xyXG5cdFx0XHRcdFx0aWYoZnJvbVVwZGF0ZSkgbG9nKFwiaW5mb1wiLCBcIltITVJdIFVwZGF0ZSBhcHBsaWVkLlwiKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVxdWlyZShcIi4vbG9nLWFwcGx5LXJlc3VsdFwiKSh1cGRhdGVkTW9kdWxlcywgdXBkYXRlZE1vZHVsZXMpO1xyXG5cdFx0XHRcdGNoZWNrRm9yVXBkYXRlKHRydWUpO1xyXG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuXHRcdFx0XHR2YXIgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcclxuXHRcdFx0XHRpZihbXCJhYm9ydFwiLCBcImZhaWxcIl0uaW5kZXhPZihzdGF0dXMpID49IDApIHtcclxuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBDYW5ub3QgYXBwbHkgdXBkYXRlLlwiKTtcclxuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBcIiArIGVyci5zdGFjayB8fCBlcnIubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gWW91IG5lZWQgdG8gcmVzdGFydCB0aGUgYXBwbGljYXRpb24hXCIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRsb2coXCJ3YXJuaW5nXCIsIFwiW0hNUl0gVXBkYXRlIGZhaWxlZDogXCIgKyBlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHRzZXRJbnRlcnZhbChjaGVja0ZvclVwZGF0ZSwgaG90UG9sbEludGVydmFsKTtcclxufSBlbHNlIHtcclxuXHR0aHJvdyBuZXcgRXJyb3IoXCJbSE1SXSBIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGRpc2FibGVkLlwiKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvaG90L3BvbGwuanM/MTAwMFxuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvcG9sbC5qcz8xMDAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IGo1ID0gcmVxdWlyZSgnam9obm55LWZpdmUnKTtcbmNvbnN0IEV0aGVyUG9ydCA9IHJlcXVpcmUoJ2V0aGVycG9ydCcpO1xuY29uc3Qge1xuICBCT0FSRF9TVEFUVVMsXG4gIEVSUk9SX01FU1NBR0UsXG4gIEVUSEVSUE9SVF9QT1JULFxuICBNT1RPUl9QSU5TLFxuICBFWENFUFRJT05TLFxuICBESVNBQkxFX0JPQVJELFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmZ1bmN0aW9uIEJvYXJkKCkge1xuICBjb25zb2xlLmxvZygnQm9hcmQgc3VmZmVzZnVsbHkgY29ubmVjdGVkIScpO1xuICB0aGlzLnN0YXR1cyA9IEJPQVJEX1NUQVRVUy5DT05ORUNUSU5HO1xuICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gIHRoaXMubW92ZU1vdG9yID0gYXN5bmMgKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFLk5PVF9DT05ORUNURUQpO1xuICB9O1xuXG4gIGNvbnN0IGJvYXJkID0gbmV3IGo1LkJvYXJkKHtcbiAgICBwb3J0OiBuZXcgRXRoZXJQb3J0KEVUSEVSUE9SVF9QT1JUKSxcbiAgICB0aW1lb3V0OiAxZTUsXG4gICAgcmVwbDogZmFsc2UsXG4gIH0pO1xuXG4gIGJvYXJkLm9uKCdyZWFkeScsICgpID0+IHtcbiAgICB0aGlzLnN0YXR1cyA9IEJPQVJEX1NUQVRVUy5TVUNDRVNTRlVMO1xuXG4gICAgY29uc3Qgc3RlcHBlciA9IG5ldyBqNS5TdGVwcGVyKHtcbiAgICAgIHR5cGU6IGo1LlN0ZXBwZXIuVFlQRS5GT1VSX1dJUkUsXG4gICAgICBzdGVwc1BlclJldjogOTYsXG4gICAgICBwaW5zOiBNT1RPUl9QSU5TLFxuICAgIH0pO1xuXG4gICAgbW92ZU1vdG9yID0gc3RlcHMgPT5cbiAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICAgICAgc3RlcHBlclxuICAgICAgICAgIC5ycG0oMzAwKVxuICAgICAgICAgIC5kaXJlY3Rpb24oXG4gICAgICAgICAgICBzdGVwcyA+IDAgPyBqNS5TdGVwcGVyLkRJUkVDVElPTi5DQ1cgOiBqNS5TdGVwcGVyLkRJUkVDVElPTi5DVyxcbiAgICAgICAgICApXG4gICAgICAgICAgLnN0ZXAoTWF0aC5hYnMoc3RlcHMpLCByZXNvbHZlKSxcbiAgICAgICk7XG5cbiAgICB0aGlzLm1vdmVNb3RvciA9IGFzeW5jIHN0ZXBzID0+IHtcbiAgICAgIGlmICh0aGlzLmlzTW92aW5nID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFLlJPTExFUl9CTElORFNfTU9WSU5HKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgICAgYXdhaXQgbW92ZU1vdG9yKHN0ZXBzKTtcbiAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICB9O1xuICB9KTtcblxuICBib2FyZC5vbignZXJyb3InLCBlcnJvciA9PiB7XG4gICAgdGhpcy5zdGF0dXMgPSBCT0FSRF9TVEFUVVMuRVJST1I7XG4gICAgY29uc29sZS5lcnJvcihFUlJPUl9NRVNTQUdFLkNPTk5FQ1RJTkdfQk9BUkRfRVJST1IpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gQm9hcmREaXNhYmxlKCkge1xuICBjb25zb2xlLmxvZygnQk9BUkQgU1VDQ0VTU0ZVTExZIERJU0FCTEVEIScpO1xuICB0aGlzLnN0YXR1cyA9IEJPQVJEX1NUQVRVUztcbiAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuXG4gIGNvbnN0IG1vdmVNb3RvciA9IHN0ZXBzID0+XG4gICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIE1hdGguYWJzKHN0ZXBzKSkpO1xuXG4gIHRoaXMubW92ZU1vdG9yID0gYXN5bmMgc3RlcHMgPT4ge1xuICAgIGlmICh0aGlzLmlzTW92aW5nID09PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRS5ST0xMRVJfQkxJTkRTX01PVklORyk7XG4gICAgfVxuICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgIGF3YWl0IG1vdmVNb3RvcihzdGVwcyk7XG4gICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCAoRElTQUJMRV9CT0FSRCA/IEJvYXJkRGlzYWJsZSA6IEJvYXJkKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ib2FyZC5qcyIsImNvbnN0IEJPQVJEX1NUQVRVUyA9IHtcbiAgQ09OTkVDVElORzogJ0NPTk5FQ1RJTkcnLFxuICBTVUNDRVNTRlVMOiAnU1VDQ0VTU0ZVTCcsXG4gIEVSUk9SOiAnRVJST1InLFxufTtcblxuY29uc3QgRVJST1JfTUVTU0FHRSA9IHtcbiAgTk9UX0NPTk5FQ1RFRDogJ1lvdXIgcm9sbGVyIGJsaW5kcyBhcmUgbm90IGNvbm5lY3RlZCB5ZXQuJyxcbiAgQ09OTkVDVElOR19CT0FSRF9FUlJPUjpcbiAgICBcIkNhbid0IGNvbm5lY3QgdG8geW91ciByb2xsZXIgYmxpbmRzLCBwbGVhc2UgY2hlY2sgdGhlIGNvbmZpZ3VyYXRpb25cIixcbiAgUk9MTEVSX0JMSU5EU19NT1ZJTkc6ICdZb3VyIHJvbGxlciBibGluZHMgYXJlIG1vdmluZyByaWdodCBub3cuJyxcbiAgREFUQUJBU0VfR0VUX0VSUk9SOiBcIkNhbid0IGdldCB5b3VyIHJvbGxlciBibGluZHMgcG9zaXRpb24gZnJvbSBkYXRhYmFzZVwiLFxuICBEQVRBQkFTRV9JTlNFUlRfRVJST1I6IFwiQ2FuJ3Qgc2F2ZSB5b3VyIHJvbGxlciBibGluZHMgcG9zaXRpb24gaW50byBkYXRhYmFzZVwiLFxuICBVTkhBTkRMRURfRVJST1I6ICdTb21ldGhpbmcgd2VpcmQgaGFwcGVubmVkJyxcbiAgVU5SRUNPR05JWkVEX0FDVElPTjpcbiAgICAnU29ja2V0IGhhcyByZWNlaXZlZCBhbiBpbnZhbGlkIGFjdGlvbiwgbm90aGluZyB3YXMgZG9uZSAuLi4nLFxufTtcblxuY29uc3QgQUNUSU9OUyA9IHtcbiAgU0VUX1BPU0lUSU9OX1JFUVVFU1Q6ICdzZXJ2ZXIvU0VUX1BPU0lUSU9OJyxcbiAgU0VUX1BPU0lUSU9OOiAnU0VUX1BPU0lUSU9OJyxcbiAgU0VSVkVSX0VSUk9SOiAnU0VSVkVSX0VSUk9SJyxcbiAgU09DS0VUX0NPTk5FQ1RFRDogJ1NPQ0tFVF9DT05ORUNURUQnLFxufTtcblxuY29uc3QgREVGQVVMVF9FTlYgPSB7XG4gIFBPUlQ6IDgwMDAsXG4gIE1PVE9SX1BJTlM6IFsxNCwgMTIsIDEzLCAxNV0sXG4gIEVUSEVSUE9SVF9QT1JUOiAzMDMwLFxuICBERUJVRzogdHJ1ZSxcbiAgRElTQUJMRV9CT0FSRDogZmFsc2UsXG59O1xuXG5jb25zdCBTRVJWRVJfUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgREVGQVVMVF9FTlYuUE9SVDtcblxuY29uc3QgTU9UT1JfUElOUyA9IHByb2Nlc3MuZW52Lk1PVE9SX1BJTiB8fCBERUZBVUxUX0VOVi5NT1RPUl9QSU5TO1xuXG5jb25zdCBFVEhFUlBPUlRfUE9SVCA9IHByb2Nlc3MuZW52LkVUSEVSUE9SVF9QT1JUIHx8IERFRkFVTFRfRU5WLkVUSEVSUE9SVF9QT1JUO1xuXG5jb25zdCBERUJVRyA9IHByb2Nlc3MuZW52LkRFQlVHIHx8IERFRkFVTFRfRU5WLkRFQlVHO1xuXG5jb25zdCBESVNBQkxFX0JPQVJEID0gcHJvY2Vzcy5lbnYuRElTQUJMRV9CT0FSRCB8fCBERUZBVUxUX0VOVi5ESVNBQkxFX0JPQVJEO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQk9BUkRfU1RBVFVTLFxuICBFUlJPUl9NRVNTQUdFLFxuICBBQ1RJT05TLFxuICBTRVJWRVJfUE9SVCxcbiAgTU9UT1JfUElOUyxcbiAgRVRIRVJQT1JUX1BPUlQsXG4gIERFQlVHLFxuICBESVNBQkxFX0JPQVJELFxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMuanMiLCJpbXBvcnQgcm9sbGVyQmxpbmQgZnJvbSAnLi9yb2xsZXJCbGluZCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbnJvdXRlclxuICAucm91dGUoJy9wb3NpdGlvbicpXG4gIC5nZXQoYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgcm9sbGVyQmxpbmQuZ2V0UG9zaXRpb24oKTtcbiAgICAgIHJldHVybiByZXMuanNvbih7IHBvc2l0aW9uIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXMuc3RhdHVzTWVzc2FnZSA9IGVycm9yO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDQwMCkuZW5kKCk7XG4gICAgfVxuICB9KVxuICAucHV0KGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwb3MgPSBhd2FpdCByb2xsZXJCbGluZC5zZXRQb3NpdGlvbihyZXEucG9zaXRpb24pO1xuICAgICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlcy5zdGF0dXNNZXNzYWdlID0gZXJyb3I7XG4gICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDAwKS5lbmQoKTtcbiAgICB9XG4gIH0pO1xuXG5yb3V0ZXIuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiByZXMuc2VuZEZpbGUoX19kaXJuYW1lICsgJy9zcmMvaW5kZXguaHRtbCcpKTtcblxucm91dGVyLmdldCgnL3N0YXR1cycsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBzdGF0dXMgPSByb2xsZXJCbGluZC5nZXRTdGF0dXMoKTtcbiAgcmV0dXJuIHJlcy5qc29uKHsgc3RhdHVzIH0pO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250cm9sbGVyLmpzIiwiaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgaW5pdFNvY2tldCBmcm9tICcuL3NvY2tldCc7XG5pbXBvcnQgeyBTRVJWRVJfUE9SVCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpLnVzZShjb250cm9sbGVyKTtcbmNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5cbmxldCBjdXJyZW50QXBwID0gYXBwO1xubGV0IGN1cnJlbnRBcHBTb2NrZXQgPSBpbml0U29ja2V0KHNlcnZlcik7XG5cbnNlcnZlci5saXN0ZW4oU0VSVkVSX1BPUlQsICgpID0+IHtcbiAgY29uc29sZS5sb2coXG4gICAgJ0xpc3RlbmluZyBvbiBwb3J0ICcgKyBTRVJWRVJfUE9SVCArICcuLi4gaHR0cDovL2xvY2FsaG9zdDonICsgU0VSVkVSX1BPUlQsXG4gICk7XG59KTtcblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vYXBwJywgKCkgPT4ge1xuICAgIHNlcnZlci5yZW1vdmVMaXN0ZW5lcigncmVxdWVzdCcsIGN1cnJlbnRBcHApO1xuICAgIHNlcnZlci5vbigncmVxdWVzdCcsIGFwcCk7XG4gICAgY3VycmVudEFwcCA9IGFwcDtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJjb25zdCBzdG9yYWdlID0gcmVxdWlyZSgnLi9zdG9yYWdlJyk7XG5pbXBvcnQgQm9hcmQgZnJvbSAnLi9ib2FyZCc7XG5jb25zdCB7IGNhbGN1bGF0ZVN0ZXBzLCBub29wIH0gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKCk7XG5cbmNvbnN0IGdldFBvc2l0aW9uID0gYXN5bmMgKCkgPT4gYXdhaXQgc3RvcmFnZS5nZXRQb3NpdGlvbigpO1xuXG5jb25zdCBzZXRQb3NpdGlvbiA9IGFzeW5jIG5ld1Bvc2l0aW9uID0+IHtcbiAgY29uc3QgcG9zaXRpb24gPSBhd2FpdCBzdG9yYWdlLmdldFBvc2l0aW9uKCk7XG4gIGNvbnN0IHN0ZXBzID0gY2FsY3VsYXRlU3RlcHMobmV3UG9zaXRpb24sIHBvc2l0aW9uKTtcbiAgYXdhaXQgYm9hcmQubW92ZU1vdG9yKHN0ZXBzKTtcbiAgYXdhaXQgc3RvcmFnZS5zZXRQb3NpdGlvbihuZXdQb3NpdGlvbik7XG4gIHJldHVybiBuZXdQb3NpdGlvbjtcbn07XG5cbmNvbnN0IGdldFN0YXR1cyA9ICgpID0+IGJvYXJkLnN0YXR1cztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRQb3NpdGlvbixcbiAgc2V0UG9zaXRpb24sXG4gIGdldFN0YXR1cyxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcm9sbGVyQmxpbmQuanMiLCJpbXBvcnQgc29ja2V0SW8gZnJvbSAnc29ja2V0LmlvJztcbmNvbnN0IHJvbGxlckJsaW5kID0gcmVxdWlyZSgnLi9yb2xsZXJCbGluZCcpO1xuXG5jb25zdCB7IEFDVElPTlMsIEVSUk9SX01FU1NBR0UsIERFQlVHIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBpbml0U29ja2V0ID0gc2VydmVyID0+IHtcbiAgY29uc3QgaW8gPSBzb2NrZXRJbyhzZXJ2ZXIsIHtcbiAgICBzZXJ2ZUNsaWVudDogZmFsc2UsXG4gICAgd3NFbmdpbmU6ICd3cycsIC8vIHV3cyBpcyBub3Qgc3VwcG9ydGVkIHNpbmNlIGl0IGlzIGEgbmF0aXZlIG1vZHVsZVxuICB9KTtcblxuICBsZXQgY29ubmVjdGVkU29ja2V0cyA9IFtdO1xuXG4gIGlvLm9uKCdjb25uZWN0aW9uJywgYXN5bmMgc29ja2V0ID0+IHtcbiAgICBjb25uZWN0ZWRTb2NrZXRzLnB1c2goc29ja2V0LmlkKTtcbiAgICBjb25zb2xlLmxvZygnbmV3IHNvY2tldCBjb25uZWN0aW9uJywgY29ubmVjdGVkU29ja2V0cyk7XG5cbiAgICBzb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICBjb25uZWN0ZWRTb2NrZXRzID0gY29ubmVjdGVkU29ja2V0cy5maWx0ZXIoeCA9PiB4ICE9PSBzb2NrZXQuaWQpO1xuICAgICAgY29uc29sZS5sb2coJ2Rpc2Nvbm5lY3RlZCBzb2NrZXQnLCBjb25uZWN0ZWRTb2NrZXRzKTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5lbWl0KCdhY3Rpb24nLCB7IHR5cGU6IEFDVElPTlMuU09DS0VUX0NPTk5FQ1RFRCB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBhd2FpdCByb2xsZXJCbGluZC5nZXRQb3NpdGlvbigpO1xuICAgICAgc29ja2V0LmVtaXQoJ2FjdGlvbicsIHsgdHlwZTogQUNUSU9OUy5TRVRfUE9TSVRJT04sIHBvc2l0aW9uIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzb2NrZXQuZW1pdCgnYWN0aW9uJywge1xuICAgICAgICB0eXBlOiBBQ1RJT05TLlNFUlZFUl9FUlJPUixcbiAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzb2NrZXQub24oJ2FjdGlvbicsIGFzeW5jIGFjdGlvbiA9PiB7XG4gICAgICBpZiAoREVCVUcpIGNvbnNvbGUubG9nKCdOZXcgYWN0aW9uIHJlY2VpdmVkJywgYWN0aW9uLnR5cGUpO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQUNUSU9OUy5TRVRfUE9TSVRJT05fUkVRVUVTVDpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBhd2FpdCByb2xsZXJCbGluZC5zZXRQb3NpdGlvbihhY3Rpb24ucG9zaXRpb24pO1xuICAgICAgICAgICAgaW8uZW1pdCgnYWN0aW9uJywge1xuICAgICAgICAgICAgICB0eXBlOiBBQ1RJT05TLlNFVF9QT1NJVElPTixcbiAgICAgICAgICAgICAgcG9zaXRpb246IG5ld1Bvc2l0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdhY3Rpb24nLCB7XG4gICAgICAgICAgICAgIHR5cGU6IEFDVElPTlMuU0VSVkVSX0VSUk9SLFxuICAgICAgICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzb2NrZXQuZW1pdCgnYWN0aW9uJywge1xuICAgICAgICAgICAgdHlwZTogQUNUSU9OUy5TRVJWRVJfRVJST1IsXG4gICAgICAgICAgICBlcnJvcjogRVJST1JfTUVTU0FHRS5VTlJFQ09HTklaRURfQUNUSU9OLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRTb2NrZXQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc29ja2V0LmpzIiwiY29uc3QgZGF0YXN0b3JlID0gcmVxdWlyZSgnbmVkYi1wcm9taXNlJyk7XG5pbXBvcnQgeyB3aXRoRGVidWdIT0YgfSBmcm9tICcuL3V0aWxzJztcbmNvbnN0IHsgRVJST1JfTUVTU0FHRSwgREVCVUcgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmxldCBkYiA9IGRhdGFzdG9yZSh7IGZpbGVuYW1lOiAnLi9zcmMvZGF0YWJhc2UuZGInLCBhdXRvbG9hZDogdHJ1ZSB9KTtcblxuY29uc3QgZ2V0UG9zaXRpb24gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZG9jdW1lbnQgPSBhd2FpdCBkYlxuICAgICAgLmNmaW5kKHt9KVxuICAgICAgLnNvcnQoeyBkYXRlVGltZTogLTEgfSlcbiAgICAgIC5saW1pdCgxKVxuICAgICAgLmV4ZWMoKTtcblxuICAgIHJldHVybiBkb2N1bWVudFswXS5wb3NpdGlvbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRS5EQVRBQkFTRV9HRVRfRVJST1IpO1xuICB9XG59O1xuXG5jb25zdCBzZXRQb3NpdGlvbiA9IGFzeW5jIHBvc2l0aW9uID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBuZXdQb3NpdGlvblJlY29yZCA9IHsgcG9zaXRpb24sIGRhdGVUaW1lOiBEYXRlLm5vdygpIH07XG4gICAgYXdhaXQgZGIuaW5zZXJ0KG5ld1Bvc2l0aW9uUmVjb3JkKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0UuREFUQUJBU0VfSU5TRVJUX0VSUk9SKTtcbiAgfVxufTtcblxuLy8gZXhwb3J0IGRlZmF1bHQge1xuLy8gICBnZXRQb3NpdGlvbjogd2l0aERlYnVnSE9GKGdldFBvc2l0aW9uKSxcbi8vICAgc2V0UG9zaXRpb246IHdpdGhEZWJ1Z0hPRihzZXRQb3NpdGlvbiksXG4vLyB9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFBvc2l0aW9uLFxuICBzZXRQb3NpdGlvbixcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmFnZS5qcyIsImltcG9ydCB7IERFQlVHIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5jb25zdCBTVEVQUEVSX01PVE9SX1NURVBTX09ORV9MQVAgPSA0MDk2O1xuY29uc3QgVE9UQUxfU1RFUFNfRlVMTF9CTElORFMgPSBTVEVQUEVSX01PVE9SX1NURVBTX09ORV9MQVAgKiA4O1xuXG5jb25zdCBNSU5fUE9TSVRJT04gPSAwO1xuY29uc3QgTUFYX1BPU0lUSU9OID0gMTAwO1xuXG5jb25zdCBwb3NpdGlvblRvU3RlcHMgPSBwb3NpdGlvbiA9PlxuICBwb3NpdGlvbiAqIFRPVEFMX1NURVBTX0ZVTExfQkxJTkRTIC8gTUFYX1BPU0lUSU9OO1xuXG5jb25zdCBjYWxjdWxhdGVTdGVwcyA9IChuZXdQb3NpdGlvbiwgY3VycmVudFBvc2l0aW9uKSA9PlxuICBwb3NpdGlvblRvU3RlcHMobmV3UG9zaXRpb24pIC0gcG9zaXRpb25Ub1N0ZXBzKGN1cnJlbnRQb3NpdGlvbik7XG5cbmNvbnN0IGZ1bmN0aW9uQ2FsbExvZ2dlckhPRiA9IGZ1bmMgPT4gcGFyYW1zID0+IHtcbiAgY29uc3QgZnVuY3Rpb25DYWxsID0gYGZ1bmN0aW9uIGNhbGxlZDogJHtmdW5jLm5hbWV9YDtcbiAgY29uc3QgcGFyYW1zRGVzY3JpcHRpb24gPSBwYXJhbXMgPyBgLCB3aXRoIHBhcmFtczogJHtwYXJhbXN9YCA6ICcnO1xuICBjb25zb2xlLmxvZyhgRlVOQ1RJT05fTE9HR0VSOiAke2Z1bmN0aW9uQ2FsbH0ke3BhcmFtc0Rlc2NyaXB0aW9ufWApO1xuXG4gIHJldHVybiBmdW5jKHBhcmFtcyk7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHdpdGhEZWJ1Z0hPRiA9IGZ1bmMgPT4gKERFQlVHID8gZnVuY3Rpb25DYWxsTG9nZ2VySE9GKGZ1bmMpIDogZnVuYyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FsY3VsYXRlU3RlcHMsXG4gIHdpdGhEZWJ1Z0hPRixcbiAgbm9vcCxcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCJcbi8vIG1vZHVsZSBpZCA9IGJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCJcbi8vIG1vZHVsZSBpZCA9IGJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3Jcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXRoZXJwb3J0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXRoZXJwb3J0XCJcbi8vIG1vZHVsZSBpZCA9IGV0aGVycG9ydFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzc1wiXG4vLyBtb2R1bGUgaWQgPSBleHByZXNzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IGh0dHBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiam9obm55LWZpdmVcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqb2hubnktZml2ZVwiXG4vLyBtb2R1bGUgaWQgPSBqb2hubnktZml2ZVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZWRiLXByb21pc2VcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJuZWRiLXByb21pc2VcIlxuLy8gbW9kdWxlIGlkID0gbmVkYi1wcm9taXNlXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNvY2tldC5pb1wiXG4vLyBtb2R1bGUgaWQgPSBzb2NrZXQuaW9cbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==